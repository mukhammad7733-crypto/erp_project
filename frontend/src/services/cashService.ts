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
    try {
      return await api.get<CashAccount>(`/cash/accounts/${id}`)
    } catch (error) {
      console.log('Using mock cash account data')
      const account = mockCashAccounts.find(acc => acc.id === id)
      if (!account) throw new Error('Account not found')
      return account
    }
  },

  createAccount: async (data: Partial<CashAccount>): Promise<CashAccount> => {
    try {
      return await api.post<CashAccount>('/cash/accounts', data)
    } catch (error) {
      console.log('Using mock - simulating account creation')
      const newAccount: CashAccount = {
        id: Math.max(...mockCashAccounts.map(a => a.id)) + 1,
        name: data.name || 'New Account',
        accountType: data.accountType || 'BANK',
        currency: data.currency || 'USD',
        balance: data.balance || 0,
        branch: data.branch,
        isActive: true,
        createdAt: new Date().toISOString(),
      }
      mockCashAccounts.push(newAccount)
      return newAccount
    }
  },

  updateAccount: async (id: number, data: Partial<CashAccount>): Promise<CashAccount> => {
    try {
      return await api.put<CashAccount>(`/cash/accounts/${id}`, data)
    } catch (error) {
      console.log('Using mock - simulating account update')
      const account = mockCashAccounts.find(acc => acc.id === id)
      if (!account) throw new Error('Account not found')
      Object.assign(account, data)
      return account
    }
  },

  deleteAccount: async (id: number): Promise<void> => {
    try {
      return await api.delete(`/cash/accounts/${id}`)
    } catch (error) {
      console.log('Using mock - simulating account deletion')
      const index = mockCashAccounts.findIndex(acc => acc.id === id)
      if (index === -1) throw new Error('Account not found')
      mockCashAccounts.splice(index, 1)
    }
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
    try {
      return await api.post<Transaction>('/cash/transactions', data)
    } catch (error) {
      console.log('Using mock - simulating transaction creation')
      const newTransaction: Transaction = {
        id: Math.max(...mockTransactions.map(t => t.id)) + 1,
        accountId: data.accountId || 1,
        accountName: data.accountName || 'Account',
        type: data.type || 'INCOME',
        amount: data.amount || 0,
        category: data.category || 'Other',
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        client: data.client,
        branch: data.branch,
        createdBy: 'user',
        createdAt: new Date().toISOString(),
      }
      mockTransactions.unshift(newTransaction)
      return newTransaction
    }
  },

  getBalance: async (branch?: string): Promise<{ total: number; byAccount: Record<string, number> }> => {
    try {
      const params = branch ? `?branch=${branch}` : ''
      return await api.get(`/cash/balance${params}`)
    } catch (error) {
      console.log('Using mock cash balance data')
      const filteredAccounts = branch
        ? mockCashAccounts.filter(acc => acc.branch === branch)
        : mockCashAccounts
      const total = filteredAccounts.reduce((sum, acc) => sum + acc.balance, 0)
      const byAccount: Record<string, number> = {}
      filteredAccounts.forEach(acc => {
        byAccount[acc.name] = acc.balance
      })
      return { total, byAccount }
    }
  },

  getCashFlow: async (startDate: string, endDate: string): Promise<CashFlowData[]> => {
    try {
      return await api.get<CashFlowData[]>(`/cash/flow?startDate=${startDate}&endDate=${endDate}`)
    } catch (error) {
      console.log('Using mock cash flow data')
      return mockCashFlowData
    }
  },
}
