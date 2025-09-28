export const formatPrice = (cents: number, currency: "MUR" = "MUR"): string => {
  const amount = cents / 100
  return `Rs ${amount.toLocaleString("en-MU", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Indian/Mauritius",
  }
  return date.toLocaleDateString("en-GB", options).replace(",", " ·")
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Indian/Mauritius",
  }
  return date.toLocaleDateString("en-GB", options)
}

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Indian/Mauritius",
  }
  return date.toLocaleTimeString("en-GB", options)
}

export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = date.getTime() - now.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))

  if (diffInDays > 0) {
    return `in ${diffInDays} day${diffInDays > 1 ? "s" : ""}`
  } else if (diffInDays < 0) {
    return `${Math.abs(diffInDays)} day${Math.abs(diffInDays) > 1 ? "s" : ""} ago`
  } else if (diffInHours > 0) {
    return `in ${diffInHours} hour${diffInHours > 1 ? "s" : ""}`
  } else if (diffInHours < 0) {
    return `${Math.abs(diffInHours)} hour${Math.abs(diffInHours) > 1 ? "s" : ""} ago`
  } else if (diffInMinutes > 0) {
    return `in ${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""}`
  } else if (diffInMinutes < 0) {
    return `${Math.abs(diffInMinutes)} minute${Math.abs(diffInMinutes) > 1 ? "s" : ""} ago`
  } else {
    return "now"
  }
}

export const isEventLive = (startDate: string, endDate: string): boolean => {
  const now = new Date()
  const start = new Date(startDate)
  const end = new Date(endDate)
  return now >= start && now <= end
}

export const isEventUpcoming = (startDate: string): boolean => {
  const now = new Date()
  const start = new Date(startDate)
  return now < start
}

export const generateOrderRef = (): string => {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `TKT-${timestamp}-${random}`.toUpperCase()
}

export const generateQRCode = (ticketId: string, orderRef: string): string => {
  // Simple QR code placeholder - in real app would use proper QR library
  return `QR-${ticketId}-${orderRef}-${Date.now()}`
}

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export const isSameWeek = (date1: Date, date2: Date): boolean => {
  const startOfWeek1 = new Date(date1)
  startOfWeek1.setDate(date1.getDate() - date1.getDay())
  const startOfWeek2 = new Date(date2)
  startOfWeek2.setDate(date2.getDate() - date2.getDay())
  return isSameDay(startOfWeek1, startOfWeek2)
}

export const isSameMonth = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth()
}

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date)
  result.setMonth(result.getMonth() + months)
  return result
}
