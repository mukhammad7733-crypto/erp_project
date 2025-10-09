import api from './api'
import { Contract, ContractDocument, PageResponse, PaginationParams, FilterParams } from '../types'
import { mockContracts } from './mockData'

export const contractService = {
  getContracts: async (params: PaginationParams & FilterParams): Promise<PageResponse<Contract>> => {
    try {
      const queryParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) queryParams.append(key, String(value))
      })
      return await api.get<PageResponse<Contract>>(`/contracts?${queryParams.toString()}`)
    } catch (error) {
      console.log('Using mock contracts data')
      return {
        content: mockContracts,
        totalElements: mockContracts.length,
        totalPages: 1,
        size: params.size,
        number: params.page,
      }
    }
  },

  getContract: async (id: number): Promise<Contract> => {
    return api.get<Contract>(`/contracts/${id}`)
  },

  createContract: async (data: Partial<Contract>): Promise<Contract> => {
    return api.post<Contract>('/contracts', data)
  },

  updateContract: async (id: number, data: Partial<Contract>): Promise<Contract> => {
    return api.put<Contract>(`/contracts/${id}`, data)
  },

  deleteContract: async (id: number): Promise<void> => {
    return api.delete(`/contracts/${id}`)
  },

  uploadDocument: async (contractId: number, file: File): Promise<ContractDocument> => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post<ContractDocument>(`/contracts/${contractId}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  deleteDocument: async (contractId: number, documentId: number): Promise<void> => {
    return api.delete(`/contracts/${contractId}/documents/${documentId}`)
  },
}
