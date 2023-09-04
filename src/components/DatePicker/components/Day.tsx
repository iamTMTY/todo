import { useCallback, useEffect, useState } from "react";
import { getDate, isEqual, isWithinInterval, isBefore, isSameDay } from "date-fns";
import { DatePickerProps } from "../types";

type Props = {
  datePicker: DatePickerProps
  setDatePicker: React.Dispatch<React.SetStateAction<DatePickerProps>>
  onChange: (data: DatePickerProps) => void
  position: "current" | "previous" | "next"
  date: string
  index: number
}

export default function Day({ datePicker, setDatePicker, position, date, index, onChange }: Props) {
  
  const {startDate, endDate, hovered, isRange} = datePicker
  // const month = getMonth(new Date(date))
  // const year = getYear(new Date(date))
  const day = getDate(new Date(date))
  const isRightEdge = index % 7 === 0
  const isLeftEdge = index % 7 === 1
  const [isStartDate, setIsStartDate] = useState(false)
  const [isEndDate, setIsEndDate] = useState(false)
  const [dateIsWithinRange, setDateIsWithinRange] = useState(false)
  const [dateIsWithinHoveredRange, setDateIsWithinHoveredRange] = useState(false)

  const setStartOrEndDate = useCallback(() => {
    const isStartDate = startDate ? isEqual(new Date(startDate), new Date(date)) : false
    const isEndDate = endDate ? isEqual(new Date(endDate), new Date(date)) : false
    setIsEndDate(isEndDate)
    setIsStartDate(isStartDate)
  }, [date, endDate, startDate])

  const setRange = useCallback(() => {
    if(startDate && endDate) {
      const isRange = isWithinInterval(new Date(date), {start: new Date(startDate), end: new Date(endDate)})
      setDateIsWithinRange(isRange)
    } else {
      setDateIsWithinRange(false)
    }
  }, [date, startDate, endDate])

  const setHoveredRange = useCallback(() => {
    if(startDate && !endDate) {
      try {
        const isRange = isWithinInterval(new Date(date), {start: new Date(startDate), end: new Date(hovered)})
        setDateIsWithinHoveredRange(isRange)
      } catch (error) {
        setDateIsWithinHoveredRange(false)
      }
    } else {
      false
    }
  }, [startDate, endDate, hovered, date])

  useEffect(() => {
    setStartOrEndDate()
    setRange()
    setHoveredRange()
  }, [datePicker, setRange, setStartOrEndDate])

  const handleRangeClick = useCallback(() => {

    let inValidRange
    if(startDate && !endDate) {
      inValidRange = isBefore(new Date(date), new Date(startDate))
      inValidRange && setDatePicker(prevState => ({...prevState, error: `date must be after ${new Date(startDate).toDateString()}`}))
    }
    if(!inValidRange) {
      setDatePicker(prevState => {
        if(!prevState.startDate) {
          return {...prevState, startDate: date, isCustom: true, showAll: false, error: ""}
        } else if(!prevState.endDate) {
          const n = {...prevState, endDate: date, error: ""}
          onChange?.(n)
          return n
        } else {
          return {...prevState, startDate: date, endDate: "", isCustom: true, showAll: false, error: ""}
        }
      })
    }
  }, [startDate, endDate])

  const onMouseEnter = useCallback(() => {
    setDatePicker(prev => ({...prev, hovered: date}))
  }, [hovered])

  return (
    <div className="w-full flex justify-center items-center">
      {
        isRange ?
        <button
          onClick={handleRangeClick}
          // onKeyDown={onKeyDown}
          onMouseEnter={onMouseEnter}
          // tabIndex={tabIndex}
          type="button"
          // ref={dayRef}
          className={`text-sm p-2 w-10 h-10 border-0 hover:bg-[#EDF2F7] hover:text-[#0048D3] ${isSameDay(new Date(date), new Date(hovered)) ? "rounded-tr-full rounded-br-full" : "hover:rounded-full"} ${dateIsWithinRange || isStartDate || isEndDate || dateIsWithinHoveredRange ? `bg-[#EDF2F7]` : ""} ${isStartDate || ((dateIsWithinRange || dateIsWithinHoveredRange) && isLeftEdge) ? "rounded-tl-full rounded-bl-full" : ""} ${positionMapping[position]} relative ${isEndDate || ((dateIsWithinRange || dateIsWithinHoveredRange) && isRightEdge) ? "rounded-tr-full rounded-br-full" : ""} ${position === "next" || position === "previous" ? "text-gray-400" : ""} mb-1 dark:text-gray-200 dark:hover:text-[#0048D3]`}
        >
          {day}
          {(isStartDate || isEndDate) && <div className="absolute w-full h-full flex items-center justify-center top-0 left-0 rounded-full text-white bg-[#0048D3]">{day}</div>}
        </button> :
        <button
          onClick={() => {
            setDatePicker(prev => {
              const newState = {...prev, startDate: date}
              onChange?.(newState)
              return newState
            })
          }}
          type="button"
          className={`text-sm p-2 w-10 h-10 border-0 hover:rounded-full ${isStartDate ? `bg-[#0048D3] dark:hover:text-white rounded-full text-white font-medium` : "hover:bg-[#EDF2F7] hover:text-[#0048D3] dark:hover:text-[#0048D3]"} ${position === "next" || position === "previous" ? "text-gray-400 dark:text-gray-600" : "dark:text-gray-200"} relative mb-1`}
        >
          {day}
        </button>
      }
    </div>

  );
}

// const colorMapping = {
//   selectedFirstOrLastColor: "text-[#FFFFFF]",
//   normalColor: "text-[#001217]",
//   selectedColor: "text-[#0048D3]",
//   rangeHoverColor: "text-[#0048D3]",
//   disabledColor: "text-[#808285]"
// }

// const bgMapping = {
//   selectedFirstOrLastColor: "bg-[#0048D3]",
//   normalColor: "bg-[#FFFFFF]",
//   selectedColor: "bg-[#EDF2F7]",
//   rangeHoverColor: "bg-[#EDF2F7]",
//   disabledColor: "bg-[#FFFFFF]"
// }

const positionMapping = {
  current: "text-[#344054]",
  previous: "text-[#667085]",
  next: "text-[#667085]"
}