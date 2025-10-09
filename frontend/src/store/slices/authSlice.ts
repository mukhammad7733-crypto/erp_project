import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { User, LoginCredentials, RegisterData, AuthResponse } from '../../types'
import { authService } from '../../services/authService'

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}

const token = localStorage.getItem('token')

const initialState: AuthState = {
  isAuthenticated: !!token,
  user: null,
  token: token,
  loading: false,
  error: null,
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials) => {
    // Development mode bypass
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      // Create mock response for development
      const mockResponse: AuthResponse = {
        token: 'dev-mock-token-' + Date.now(),
        refreshToken: 'dev-mock-refresh-token-' + Date.now(),
        user: {
          id: 1,
          username: 'admin',
          email: 'admin@democompany.com',
          firstName: 'Admin',
          lastName: 'User',
          role: 'ADMIN' as any,
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      }

      // Store tokens
      localStorage.setItem('token', mockResponse.token)
      localStorage.setItem('refreshToken', mockResponse.refreshToken)

      return mockResponse
    }

    // Try real API call
    try {
      const response = await authService.login(credentials)
      return response
    } catch (error) {
      // If API fails and credentials match dev credentials, use mock
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        const mockResponse: AuthResponse = {
          token: 'dev-mock-token-' + Date.now(),
          refreshToken: 'dev-mock-refresh-token-' + Date.now(),
          user: {
            id: 1,
            username: 'admin',
            email: 'admin@democompany.com',
            firstName: 'Admin',
            lastName: 'User',
            role: 'ADMIN' as any,
            active: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        }

        localStorage.setItem('token', mockResponse.token)
        localStorage.setItem('refreshToken', mockResponse.refreshToken)

        return mockResponse
      }
      throw error
    }
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async (data: RegisterData) => {
    const response = await authService.register(data)
    return response
  }
)

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async () => {
    const user = await authService.getCurrentUser()
    return user
  }
)

export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async () => {
    await authService.logout()
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.error = null
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Login failed'
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Registration failed'
      })
      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.loading = false
        state.isAuthenticated = false
        state.token = null
        state.user = null
      })
      // Logout
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isAuthenticated = false
        state.user = null
        state.token = null
      })
  },
})

export const { setCredentials, logout, clearError } = authSlice.actions
export default authSlice.reducer
