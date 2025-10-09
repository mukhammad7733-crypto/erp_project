import api from './api'
import { Debt, Payment, DebtOverviewData, PageResponse, PaginationParams, FilterParams } from '../types'
import { mockDebts, mockDebtOverview } from './mockData'

export const debtService = {
  getDebts: async (params: PaginationParams & FilterParams): Promise<PageResponse<Debt>> => {
    try {
      const queryParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) queryParams.append(key, String(value))
      })
      return await api.get<PageResponse<Debt>>(`/debts?${queryParams.toString()}`)
    } catch (error) {
      console.log('Using mock debts data')
      return {
        content: mockDebts,
        totalElements: mockDebts.length,
        totalPages: 1,
        size: params.size,
        number: params.page,
      }
    }
  },

  getDebt: async (id: number): Promise<Debt> => {
    return api.get<Debt>(`/debts/${id}`)
  },

  createDebt: async (data: Partial<Debt>): Promise<Debt> => {
    return api.post<Debt>('/debts', data)
  },

  updateDebt: async (id: number, data: Partial<Debt>): Promise<Debt> => {
    return api.put<Debt>(`/debts/${id}`, data)
  },

  deleteDebt: async (id: number): Promise<void> => {
    return api.delete(`/debts/${id}`)
  },

  recordPayment: async (debtId: number, payment: Partial<Payment>): Promise<Payment> => {
    return api.post<Payment>(`/debts/${debtId}/payments`, payment)
  },

  getOverview: async (): Promise<DebtOverviewData> => {
    return api.get<DebtOverviewData>('/debts/overview')
  },
}
