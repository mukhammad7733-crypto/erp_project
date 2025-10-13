import api from './api'
import { LoginCredentials, RegisterData, AuthResponse, User } from '../types'

// Mock data for development without backend
const MOCK_USER: User = {
  id: '1',
  username: 'admin',
  email: 'admin@erp.com',
  role: 'ADMIN',
  firstName: 'Admin',
  lastName: 'User',
  phone: '+1234567890',
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

const MOCK_TOKEN = 'mock-jwt-token-' + Math.random().toString(36).substring(7)
const MOCK_REFRESH_TOKEN = 'mock-refresh-token-' + Math.random().toString(36).substring(7)

const USE_MOCK_DATA = true // Set to false when backend is ready

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    if (USE_MOCK_DATA) {
      // Mock login - accept any credentials for demo
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
      const response: AuthResponse = {
        token: MOCK_TOKEN,
        refreshToken: MOCK_REFRESH_TOKEN,
        user: MOCK_USER
      }
      localStorage.setItem('token', response.token)
      localStorage.setItem('refreshToken', response.refreshToken)
      localStorage.setItem('mockUser', JSON.stringify(MOCK_USER))
      return response
    }

    const response = await api.post<AuthResponse>('/auth/login', credentials)
    localStorage.setItem('token', response.token)
    localStorage.setItem('refreshToken', response.refreshToken)
    return response
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    if (USE_MOCK_DATA) {
      // Mock register
      await new Promise(resolve => setTimeout(resolve, 500))
      const newUser: User = {
        ...MOCK_USER,
        username: data.username,
        email: data.email,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
      }
      const response: AuthResponse = {
        token: MOCK_TOKEN,
        refreshToken: MOCK_REFRESH_TOKEN,
        user: newUser
      }
      localStorage.setItem('token', response.token)
      localStorage.setItem('refreshToken', response.refreshToken)
      localStorage.setItem('mockUser', JSON.stringify(newUser))
      return response
    }

    const response = await api.post<AuthResponse>('/auth/register', data)
    localStorage.setItem('token', response.token)
    localStorage.setItem('refreshToken', response.refreshToken)
    return response
  },

  logout: async (): Promise<void> => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300))
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('mockUser')
      return
    }

    await api.post('/auth/logout')
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
  },

  getCurrentUser: async (): Promise<User> => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 200))
      const storedUser = localStorage.getItem('mockUser')
      return storedUser ? JSON.parse(storedUser) : MOCK_USER
    }

    return api.get<User>('/auth/me')
  },

  refreshToken: async (refreshToken: string): Promise<{ token: string }> => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 200))
      return { token: MOCK_TOKEN }
    }

    return api.post('/auth/refresh', { refreshToken })
  },
}
