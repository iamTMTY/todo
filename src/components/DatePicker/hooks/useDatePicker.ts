
import {useState} from 'react'
import { DatePickerProps, UseDatePickerProps } from '../types'

export default function useDatePicker(options?: UseDatePickerProps) {
  const startDate = options?.startDate
  const endDate = options?.endDate
  const isRange = !!options?.isRange

  let currentYear = new Date().getFullYear()
  let currentMonth = new Date().getMonth() + 1
  let currentDate = new Date().getDate()

  if(startDate?.getMonth()) {
    currentYear = startDate.getFullYear()
    currentMonth = startDate.getMonth() + 1
    currentDate = startDate.getDate()
  }

  const [datePickerProps, setDatePickerProps] = useState<DatePickerProps>({
    year: currentYear,
    month: currentMonth,
    date: new Date().getDate(),
    startDate: `${currentYear}-${currentMonth}-${currentDate}`,
    endDate: endDate?.getMonth() ? `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}` : ``,
    hovered: `${currentYear}-${currentMonth}-${currentDate}`,
    isCustom: true,
    showAll: false,
    error: "",
    title: "This Month",
    isRange
  })

  return {datePickerProps, setDatePickerProps}
}

// usage

// step 1: call the hook
// const {datePickerProps, setDatePickerProps, DatePicker} = useDatePicker()

// step 2: render the component and pass the props need
// <DatePicker datePickerProps={datePickerProps} setDatePickerProps={setDatePickerProps} />