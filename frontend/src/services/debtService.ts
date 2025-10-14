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
    try {
      return await api.get<Debt>(`/debts/${id}`)
    } catch (error) {
      console.log('Using mock debt data')
      const debt = mockDebts.find(d => d.id === id)
      if (!debt) throw new Error('Debt not found')
      return debt
    }
  },

  createDebt: async (data: Partial<Debt>): Promise<Debt> => {
    try {
      return await api.post<Debt>('/debts', data)
    } catch (error) {
      console.log('Using mock - simulating debt creation')
      const newDebt: Debt = {
        id: Math.max(...mockDebts.map(d => d.id)) + 1,
        type: data.type || 'SUPPLIER',
        counterparty: data.counterparty || 'Counterparty',
        amount: data.amount || 0,
        paidAmount: data.paidAmount || 0,
        remainingAmount: (data.amount || 0) - (data.paidAmount || 0),
        dueDate: data.dueDate || new Date().toISOString(),
        status: data.status || 'PENDING',
        description: data.description || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      mockDebts.unshift(newDebt)
      return newDebt
    }
  },

  updateDebt: async (id: number, data: Partial<Debt>): Promise<Debt> => {
    try {
      return await api.put<Debt>(`/debts/${id}`, data)
    } catch (error) {
      console.log('Using mock - simulating debt update')
      const debt = mockDebts.find(d => d.id === id)
      if (!debt) throw new Error('Debt not found')
      Object.assign(debt, data, { updatedAt: new Date().toISOString() })
      return debt
    }
  },

  deleteDebt: async (id: number): Promise<void> => {
    try {
      return await api.delete(`/debts/${id}`)
    } catch (error) {
      console.log('Using mock - simulating debt deletion')
      const index = mockDebts.findIndex(d => d.id === id)
      if (index === -1) throw new Error('Debt not found')
      mockDebts.splice(index, 1)
    }
  },

  recordPayment: async (debtId: number, payment: Partial<Payment>): Promise<Payment> => {
    try {
      return await api.post<Payment>(`/debts/${debtId}/payments`, payment)
    } catch (error) {
      console.log('Using mock - simulating payment recording')
      const debt = mockDebts.find(d => d.id === debtId)
      if (!debt) throw new Error('Debt not found')

      const paymentAmount = payment.amount || 0
      debt.paidAmount += paymentAmount
      debt.remainingAmount -= paymentAmount
      if (debt.remainingAmount <= 0) {
        debt.status = 'PAID'
        debt.remainingAmount = 0
      } else {
        debt.status = 'PARTIAL'
      }
      debt.updatedAt = new Date().toISOString()

      return {
        id: Math.floor(Math.random() * 10000),
        debtId,
        amount: paymentAmount,
        paymentDate: new Date().toISOString(),
        note: payment.note || '',
        createdAt: new Date().toISOString(),
      }
    }
  },

  getOverview: async (): Promise<DebtOverviewData> => {
    try {
      return await api.get<DebtOverviewData>('/debts/overview')
    } catch (error) {
      console.log('Using mock debt overview data')
      return mockDebtOverview
    }
  },
}
