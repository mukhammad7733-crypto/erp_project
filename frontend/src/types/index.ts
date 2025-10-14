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
  accountType: 'CASH' | 'BANK'
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

// Client Types
export interface Client {
  id: number
  name: string
  inn: string
  contactPerson: string
  phone: string
  email: string
  address: string
  isActive: boolean
  totalRevenue: number
  totalDebt: number
  createdAt: string
  updatedAt: string
}

export interface ReconciliationAct {
  clientId: number
  clientName: string
  period: string
  startDate: string
  endDate: string
  transactions: ReconciliationTransaction[]
  totalIncome: number
  totalExpense: number
  balance: number
  generatedAt: string
}

export interface ReconciliationTransaction {
  id: number
  date: string
  description: string
  type: 'INCOME' | 'EXPENSE'
  amount: number
  documentNumber: string
}

// Team Types
export interface TeamMember {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  position: string
  department: string
  role: UserRole
  salary: number
  hireDate: string
  isActive: boolean
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface Department {
  id: number
  name: string
  description: string
  headId?: number
  memberCount: number
}

// Warehouse Types
export interface WarehouseItem {
  id: number
  name: string
  sku: string
  category: string
  quantity: number
  unit: string
  purchasePrice: number
  salePrice: number
  minStock: number
  location: string
  supplier: string
  lastRestocked: string
  createdAt: string
  updatedAt: string
}

export interface StockMovement {
  id: number
  itemId: number
  itemName: string
  type: 'IN' | 'OUT' | 'ADJUSTMENT'
  quantity: number
  reason: string
  performedBy: string
  date: string
  notes?: string
}

export interface WarehouseStats {
  totalItems: number
  totalValue: number
  lowStockItems: number
  outOfStockItems: number
  categories: CategoryStats[]
}

export interface CategoryStats {
  category: string
  itemCount: number
  totalValue: number
}

// Settings Types
export interface SystemSettings {
  companyName: string
  companyInn: string
  companyAddress: string
  companyPhone: string
  companyEmail: string
  defaultCurrency: string
  fiscalYearStart: string
  language: string
  timezone: string
}

export interface UserSettings {
  userId: number
  notifications: NotificationSettings
  security: SecuritySettings
  preferences: UserPreferences
}

export interface NotificationSettings {
  emailNotifications: boolean
  paymentDueReminders: boolean
  contractExpiryReminders: boolean
  lowStockAlerts: boolean
  debtOverdueAlerts: boolean
}

export interface SecuritySettings {
  twoFactorEnabled: boolean
  sessionTimeout: number
  lastPasswordChange: string
}

export interface UserPreferences {
  theme: 'light' | 'dark'
  language: string
  dateFormat: string
  numberFormat: string
}
