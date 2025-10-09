import api from './api'
import { DashboardSummary, DashboardMetrics } from '../types'
import { mockDashboardSummary, mockDashboardMetrics } from './mockData'

export const dashboardService = {
  getSummary: async (): Promise<DashboardSummary> => {
    try {
      return await api.get<DashboardSummary>('/dashboard/summary')
    } catch (error) {
      console.log('Using mock dashboard summary data')
      return mockDashboardSummary
    }
  },

  getMetrics: async (startDate?: string, endDate?: string): Promise<DashboardMetrics> => {
    try {
      const params = new URLSearchParams()
      if (startDate) params.append('startDate', startDate)
      if (endDate) params.append('endDate', endDate)

      return await api.get<DashboardMetrics>(`/dashboard/metrics?${params.toString()}`)
    } catch (error) {
      console.log('Using mock dashboard metrics data')
      return mockDashboardMetrics
    }
  },
}
