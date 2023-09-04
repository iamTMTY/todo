export type DatePickerProps = {
  year: number
  month: number
  date: number
  startDate: string
  endDate: string
  isCustom: boolean
  showAll: boolean
  hovered: string
  error: string
  title?: string
  isRange: boolean
}

export type UseDatePickerProps = {
  startDate?: Date
  endDate?: Date
  isRange?: boolean
}