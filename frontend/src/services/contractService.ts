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
    try {
      return await api.get<Contract>(`/contracts/${id}`)
    } catch (error) {
      console.log('Using mock contract data')
      const contract = mockContracts.find(c => c.id === id)
      if (!contract) throw new Error('Contract not found')
      return contract
    }
  },

  createContract: async (data: Partial<Contract>): Promise<Contract> => {
    try {
      return await api.post<Contract>('/contracts', data)
    } catch (error) {
      console.log('Using mock - simulating contract creation')
      const newContract: Contract = {
        id: Math.max(...mockContracts.map(c => c.id)) + 1,
        contractNumber: `CNT-${new Date().getFullYear()}-${String(mockContracts.length + 1).padStart(3, '0')}`,
        title: data.title || 'New Contract',
        client: data.client || 'Client',
        type: data.type || 'SERVICE',
        status: data.status || 'DRAFT',
        amount: data.amount || 0,
        startDate: data.startDate || new Date().toISOString(),
        endDate: data.endDate || new Date().toISOString(),
        paymentTerms: data.paymentTerms || 'Net 30',
        description: data.description || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      mockContracts.unshift(newContract)
      return newContract
    }
  },

  updateContract: async (id: number, data: Partial<Contract>): Promise<Contract> => {
    try {
      return await api.put<Contract>(`/contracts/${id}`, data)
    } catch (error) {
      console.log('Using mock - simulating contract update')
      const contract = mockContracts.find(c => c.id === id)
      if (!contract) throw new Error('Contract not found')
      Object.assign(contract, data, { updatedAt: new Date().toISOString() })
      return contract
    }
  },

  deleteContract: async (id: number): Promise<void> => {
    try {
      return await api.delete(`/contracts/${id}`)
    } catch (error) {
      console.log('Using mock - simulating contract deletion')
      const index = mockContracts.findIndex(c => c.id === id)
      if (index === -1) throw new Error('Contract not found')
      mockContracts.splice(index, 1)
    }
  },

  uploadDocument: async (contractId: number, file: File): Promise<ContractDocument> => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      return await api.post<ContractDocument>(`/contracts/${contractId}/documents`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    } catch (error) {
      console.log('Using mock - simulating document upload')
      return {
        id: Math.floor(Math.random() * 10000),
        contractId,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        uploadedAt: new Date().toISOString(),
        uploadedBy: 'user',
      }
    }
  },

  deleteDocument: async (contractId: number, documentId: number): Promise<void> => {
    try {
      return await api.delete(`/contracts/${contractId}/documents/${documentId}`)
    } catch (error) {
      console.log('Using mock - simulating document deletion')
      // In mock mode, just log the deletion
      return Promise.resolve()
    }
  },
}
