import * as yup from 'yup'

export const loginSchema = yup.object({
  username: yup.string().required('Требуется имя пользователя'),
  password: yup.string().required('Требуется пароль').min(6, 'Пароль должен быть не менее 6 символов'),
})

export const registerSchema = yup.object({
  username: yup.string().required('Требуется имя пользователя').min(3, 'Имя пользователя должно быть не менее 3 символов'),
  email: yup.string().email('Неверный адрес электронной почты').required('Требуется электронная почта'),
  password: yup.string().required('Требуется пароль').min(6, 'Пароль должен быть не менее 6 символов'),
  confirmPassword: yup
    .string()
    .required('Пожалуйста, подтвердите пароль')
    .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
  firstName: yup.string().required('Требуется имя'),
  lastName: yup.string().required('Требуется фамилия'),
})

export const cashAccountSchema = yup.object({
  name: yup.string().required('Требуется название счета'),
  accountType: yup.string().oneOf(['CASH', 'BANK']).required('Требуется тип счета'),
  currency: yup.string().required('Требуется валюта'),
  balance: yup.number().required('Требуется начальный остаток'),
  branch: yup.string(),
})

export const transactionSchema = yup.object({
  accountId: yup.number().required('Требуется счет'),
  type: yup.string().oneOf(['INCOME', 'EXPENSE', 'TRANSFER']).required('Требуется тип транзакции'),
  amount: yup.number().positive('Сумма должна быть положительной').required('Требуется сумма'),
  category: yup.string().required('Требуется категория'),
  description: yup.string().required('Требуется описание'),
  date: yup.string().required('Требуется дата'),
  client: yup.string(),
  branch: yup.string(),
})

export const contractSchema = yup.object({
  contractNumber: yup.string().required('Требуется номер договора'),
  title: yup.string().required('Требуется название'),
  client: yup.string().required('Требуется клиент'),
  type: yup.string().oneOf(['SERVICE', 'PRODUCT', 'MIXED']).required('Требуется тип договора'),
  status: yup.string().oneOf(['DRAFT', 'ACTIVE', 'COMPLETED', 'CANCELLED']).required('Требуется статус'),
  amount: yup.number().positive('Сумма должна быть положительной').required('Требуется сумма'),
  startDate: yup.string().required('Требуется дата начала'),
  endDate: yup.string().required('Требуется дата окончания'),
  paymentTerms: yup.string().required('Требуются условия оплаты'),
  description: yup.string(),
})

export const debtSchema = yup.object({
  type: yup.string().oneOf(['SUPPLIER', 'CLIENT']).required('Требуется тип задолженности'),
  counterparty: yup.string().required('Требуется контрагент'),
  amount: yup.number().positive('Сумма должна быть положительной').required('Требуется сумма'),
  dueDate: yup.string().required('Требуется срок оплаты'),
  description: yup.string().required('Требуется описание'),
  contractId: yup.number(),
})

export const paymentSchema = yup.object({
  amount: yup.number().positive('Сумма должна быть положительной').required('Требуется сумма'),
  paymentDate: yup.string().required('Требуется дата оплаты'),
  paymentMethod: yup.string().required('Требуется метод оплаты'),
  notes: yup.string(),
})

export const clientSchema = yup.object({
  name: yup.string().required('Требуется название компании'),
  inn: yup.string().required('Требуется ИНН').min(9, 'ИНН должен содержать минимум 9 символов'),
  contactPerson: yup.string().required('Требуется контактное лицо'),
  phone: yup.string().required('Требуется номер телефона'),
  email: yup.string().email('Неверный формат email').required('Требуется email'),
  address: yup.string().required('Требуется адрес'),
})

export const teamMemberSchema = yup.object({
  firstName: yup.string().required('Требуется имя'),
  lastName: yup.string().required('Требуется фамилия'),
  email: yup.string().email('Неверный формат email').required('Требуется email'),
  phone: yup.string().required('Требуется номер телефона'),
  position: yup.string().required('Требуется должность'),
  department: yup.string().required('Требуется отдел'),
  role: yup.string().required('Требуется роль'),
  salary: yup.number().positive('Зарплата должна быть положительной').required('Требуется зарплата'),
  hireDate: yup.string().required('Требуется дата приема'),
})

export const warehouseItemSchema = yup.object({
  name: yup.string().required('Требуется название товара'),
  sku: yup.string().required('Требуется артикул'),
  category: yup.string().required('Требуется категория'),
  quantity: yup.number().min(0, 'Количество не может быть отрицательным').required('Требуется количество'),
  unit: yup.string().required('Требуется единица измерения'),
  purchasePrice: yup.number().min(0, 'Цена не может быть отрицательной').required('Требуется цена закупки'),
  salePrice: yup.number().min(0, 'Цена не может быть отрицательной').required('Требуется цена продажи'),
  minStock: yup.number().min(0, 'Минимальный запас не может быть отрицательным').required('Требуется минимальный запас'),
  location: yup.string().required('Требуется место хранения'),
  supplier: yup.string().required('Требуется поставщик'),
})
