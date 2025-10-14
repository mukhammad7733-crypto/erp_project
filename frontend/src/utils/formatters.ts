import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'

export const formatCurrency = (amount: number, currency: string = 'UZS'): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('ru-RU').format(num)
}

export const formatDate = (dateString: string, formatStr: string = 'dd MMM yyyy'): string => {
  try {
    return format(parseISO(dateString), formatStr, { locale: ru })
  } catch {
    return dateString
  }
}

export const formatDateTime = (dateString: string): string => {
  try {
    return format(parseISO(dateString), 'dd MMM yyyy HH:mm', { locale: ru })
  } catch {
    return dateString
  }
}

export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}
