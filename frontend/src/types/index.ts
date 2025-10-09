// User and Auth Types
export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  active: boolean
  createdAt: string
  updatedAt: string
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  ACCOUNTANT = 'ACCOUNTANT',
  VIEWER = 'VIEWER'
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface AuthResponse {
  token: string
  refreshToken: string
  user: User
}

// Dashboard Types
export interface DashboardSummary {
  totalCashBalance: number
  totalActiveContracts: number
  totalSupplierDebts: number
  totalClientDebts: number
  upcomingPayments: number
  monthlyProfit: number
  monthlyRevenue: number
  monthlyExpenses: number
}

export interface DashboardMetrics {
  cashFlow: CashFlowData[]
  profitTrend: ProfitTrendData[]
  debtOverview: DebtOverviewData
  recentTransactions: Transaction[]
}

// Cash Management Types
export interface CashAccount {
  id: number
  name: string
  accountType: 'CASH' | 'BANK' | 'CREDIT_CARD'
  currency: string
  balance: number
  branch?: string
  isActive: boolean
  createdAt: string
}

export interface Transaction {
  id: number
  accountId: number
  accountName: string
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER'
  amount: number
  category: string
  description: string
  date: string
  client?: string
  branch?: string
  createdBy: string
  createdAt: string
}

export interface CashFlowData {
  date: string
  income: number
  expense: number
  balance: number
}

// Contract Types
export interface Contract {
  id: number
  contractNumber: string
  title: string
  client: string
  type: 'SERVICE' | 'PRODUCT' | 'MIXED'
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED'
  amount: number
  startDate: string
  endDate: string
  paymentTerms: string
  description?: string
  documents?: ContractDocument[]
  createdAt: string
  updatedAt: string
}

export interface ContractDocument {
  id: number
  fileName: string
  fileUrl: string
  uploadedAt: string
  uploadedBy: string
}

// Debt Types
export interface Debt {
  id: number
  type: 'SUPPLIER' | 'CLIENT'
  counterparty: string
  amount: number
  paidAmount: number
  remainingAmount: number
  dueDate: string
  status: 'PENDING' | 'PARTIAL' | 'PAID' | 'OVERDUE'
  description: string
  contractId?: number
  payments?: Payment[]
  createdAt: string
  updatedAt: string
}

export interface Payment {
  id: number
  amount: number
  paymentDate: string
  paymentMethod: string
  notes?: string
  createdBy: string
  createdAt: string
}

export interface DebtOverviewData {
  totalSupplierDebt: number
  totalClientDebt: number
  overdueSupplierDebt: number
  overdueClientDebt: number
}

// Profit Analytics Types
export interface ProfitSummary {
  totalRevenue: number
  totalExpenses: number
  netProfit: number
  profitMargin: number
  period: string
}

export interface ProfitTrendData {
  month: string
  revenue: number
  expenses: number
  profit: number
}

export interface ProfitByCategory {
  category: string
  amount: number
  percentage: number
}

// Notification Types
export interface Notification {
  id: number
  type: 'PAYMENT_DUE' | 'CONTRACT_EXPIRING' | 'DEBT_OVERDUE' | 'SYSTEM'
  title: string
  message: string
  isRead: boolean
  createdAt: string
}

// Common Types
export interface PaginationParams {
  page: number
  size: number
  sort?: string
}

export interface PageResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
}

export interface ApiError {
  message: string
  status: number
  timestamp: string
}

export interface FilterParams {
  search?: string
  startDate?: string
  endDate?: string
  status?: string
  type?: string
  client?: string
  branch?: string
}
