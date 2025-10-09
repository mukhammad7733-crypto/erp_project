import api from './api'
import { CashAccount, Transaction, CashFlowData, PageResponse, PaginationParams, FilterParams } from '../types'
import { mockCashAccounts, mockTransactions, mockCashFlowData } from './mockData'

export const cashService = {
  getAccounts: async (): Promise<CashAccount[]> => {
    try {
      return await api.get<CashAccount[]>('/cash/accounts')
    } catch (error) {
      console.log('Using mock cash accounts data')
      return mockCashAccounts
    }
  },

  getAccount: async (id: number): Promise<CashAccount> => {
    return api.get<CashAccount>(`/cash/accounts/${id}`)
  },

  createAccount: async (data: Partial<CashAccount>): Promise<CashAccount> => {
    return api.post<CashAccount>('/cash/accounts', data)
  },

  updateAccount: async (id: number, data: Partial<CashAccount>): Promise<CashAccount> => {
    return api.put<CashAccount>(`/cash/accounts/${id}`, data)
  },

  deleteAccount: async (id: number): Promise<void> => {
    return api.delete(`/cash/accounts/${id}`)
  },

  getTransactions: async (params: PaginationParams & FilterParams): Promise<PageResponse<Transaction>> => {
    try {
      const queryParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) queryParams.append(key, String(value))
      })
      return await api.get<PageResponse<Transaction>>(`/cash/transactions?${queryParams.toString()}`)
    } catch (error) {
      console.log('Using mock transactions data')
      return {
        content: mockTransactions,
        totalElements: mockTransactions.length,
        totalPages: 1,
        size: params.size,
        number: params.page,
      }
    }
  },

  createTransaction: async (data: Partial<Transaction>): Promise<Transaction> => {
    return api.post<Transaction>('/cash/transactions', data)
  },

  getBalance: async (branch?: string): Promise<{ total: number; byAccount: Record<string, number> }> => {
    const params = branch ? `?branch=${branch}` : ''
    return api.get(`/cash/balance${params}`)
  },

  getCashFlow: async (startDate: string, endDate: string): Promise<CashFlowData[]> => {
    return api.get<CashFlowData[]>(`/cash/flow?startDate=${startDate}&endDate=${endDate}`)
  },
}
