import api from './api'
import { ProfitSummary, ProfitTrendData, ProfitByCategory } from '../types'
import { mockProfitSummary, mockProfitTrend, mockProfitByCategory } from './mockData'

export const profitService = {
  getSummary: async (startDate?: string, endDate?: string): Promise<ProfitSummary> => {
    try {
      const params = new URLSearchParams()
      if (startDate) params.append('startDate', startDate)
      if (endDate) params.append('endDate', endDate)
      return await api.get<ProfitSummary>(`/profit/summary?${params.toString()}`)
    } catch (error) {
      console.log('Using mock profit summary data')
      return mockProfitSummary
    }
  },

  getMonthlyData: async (year: number): Promise<ProfitTrendData[]> => {
    try {
      return await api.get<ProfitTrendData[]>(`/profit/monthly?year=${year}`)
    } catch (error) {
      console.log('Using mock profit trend data')
      return mockProfitTrend
    }
  },

  getTrends: async (startDate: string, endDate: string): Promise<ProfitTrendData[]> => {
    try {
      return await api.get<ProfitTrendData[]>(`/profit/trends?startDate=${startDate}&endDate=${endDate}`)
    } catch (error) {
      console.log('Using mock profit trend data')
      return mockProfitTrend
    }
  },

  getByCategory: async (startDate?: string, endDate?: string): Promise<ProfitByCategory[]> => {
    try {
      const params = new URLSearchParams()
      if (startDate) params.append('startDate', startDate)
      if (endDate) params.append('endDate', endDate)
      return await api.get<ProfitByCategory[]>(`/profit/by-category?${params.toString()}`)
    } catch (error) {
      console.log('Using mock profit category data')
      return mockProfitByCategory
    }
  },
}
