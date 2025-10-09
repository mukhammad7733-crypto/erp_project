import * as yup from 'yup'

export const loginSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = yup.object({
  username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
})

export const cashAccountSchema = yup.object({
  name: yup.string().required('Account name is required'),
  accountType: yup.string().oneOf(['CASH', 'BANK', 'CREDIT_CARD']).required('Account type is required'),
  currency: yup.string().required('Currency is required'),
  balance: yup.number().required('Initial balance is required'),
  branch: yup.string(),
})

export const transactionSchema = yup.object({
  accountId: yup.number().required('Account is required'),
  type: yup.string().oneOf(['INCOME', 'EXPENSE', 'TRANSFER']).required('Transaction type is required'),
  amount: yup.number().positive('Amount must be positive').required('Amount is required'),
  category: yup.string().required('Category is required'),
  description: yup.string().required('Description is required'),
  date: yup.string().required('Date is required'),
  client: yup.string(),
  branch: yup.string(),
})

export const contractSchema = yup.object({
  contractNumber: yup.string().required('Contract number is required'),
  title: yup.string().required('Title is required'),
  client: yup.string().required('Client is required'),
  type: yup.string().oneOf(['SERVICE', 'PRODUCT', 'MIXED']).required('Contract type is required'),
  status: yup.string().oneOf(['DRAFT', 'ACTIVE', 'COMPLETED', 'CANCELLED']).required('Status is required'),
  amount: yup.number().positive('Amount must be positive').required('Amount is required'),
  startDate: yup.string().required('Start date is required'),
  endDate: yup.string().required('End date is required'),
  paymentTerms: yup.string().required('Payment terms are required'),
  description: yup.string(),
})

export const debtSchema = yup.object({
  type: yup.string().oneOf(['SUPPLIER', 'CLIENT']).required('Debt type is required'),
  counterparty: yup.string().required('Counterparty is required'),
  amount: yup.number().positive('Amount must be positive').required('Amount is required'),
  dueDate: yup.string().required('Due date is required'),
  description: yup.string().required('Description is required'),
  contractId: yup.number(),
})

export const paymentSchema = yup.object({
  amount: yup.number().positive('Amount must be positive').required('Amount is required'),
  paymentDate: yup.string().required('Payment date is required'),
  paymentMethod: yup.string().required('Payment method is required'),
  notes: yup.string(),
})
