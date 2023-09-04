import Day from "./Day";
import ChevronLeft from "../icons/ChevronLeft";
import { getDaysInMonth } from "date-fns"
import { DatePickerProps } from "../types";

type Props = {
  datePicker: DatePickerProps
  setDatePicker: React.Dispatch<React.SetStateAction<DatePickerProps>>
  isNextMonth?: boolean
  onChange: (data: DatePickerProps) => void
}

export default function Month({ datePicker, setDatePicker, isNextMonth=false, onChange }: Props) {

  const {month, year} = datePicker
  const currentMonth = isNextMonth ? (+month < 12 ? +month + 1 : 1) : month
  const currentMonthYear = isNextMonth ? (+month < 12 ? year : +year + 1) : year

  const TOTAL_DAYS = 42
  const firstDayOfMonth = getMonthFirstDay(currentMonth, currentMonthYear)
  const daysInMonth = getDaysInMonth(new Date(currentMonthYear, currentMonth - 1))
  const previousMonthYear = +currentMonth > 1 ? currentMonthYear : +currentMonthYear - 1
  const previousMonth = +currentMonth > 1 ? +currentMonth - 1 : 12
  const daysInPrevMonth = getDaysInMonth(new Date(previousMonthYear, previousMonth))
  const daysFromPreviousMonth = firstDayOfMonth - 1
  const nextMonthYear = +currentMonth < 12 ? currentMonthYear : +currentMonthYear + 1
  const nextMonth = +currentMonth < 12 ? +currentMonth + 1 : 1
  // const daysInNextMonth = getDaysInMonth(new Date(nextMonthYear, nextMonth))
  const daysFromNextMonth = TOTAL_DAYS - (daysFromPreviousMonth + daysInMonth)
  const daysInMonthArray = new Array(daysInMonth).fill("current")
  const daysFromPreviousMonthArray = new Array(daysFromPreviousMonth).fill("previous")
  const daysFromNextMonthArray = new Array(daysFromNextMonth).fill("next")
  const days: Array<"current" | "previous" | "next"> = daysFromPreviousMonthArray.concat(daysInMonthArray).concat(daysFromNextMonthArray)


  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between py-4 px-2 w-full">
        <div 
          className="cursor-pointer"
          onClick={() => {setDatePicker(prevState => ({...prevState, month: previousMonth, year: previousMonthYear}))}} 
        >
          <ChevronLeft className="w-4 h-4 fill-primary-color dark:fill-gray-200" />
        </div>
        <strong className="dark:text-gray-200">{`${MONTHS[+currentMonth - 1]} ${currentMonthYear}`}</strong>
        <div 
          className="cursor-pointer"
          onClick={() => {setDatePicker(prevState => ({...prevState, month: nextMonth, year: nextMonthYear}))}} 
        >
          <ChevronLeft className="rotate-180 w-4 h-4 fill-primary-color dark:fill-gray-200" />
        </div>
      </div>
      <div className="grid grid-cols-[repeat(7,1fr)] justify-center mb-3">
        {weekdayLabels.map(dayLabel => (
          <div className='text-center text-sm w-full dark:text-gray-200' key={currentMonth+dayLabel}>
            {dayLabel}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[repeat(7,1fr)] justify-center w-full">
        {days.map((position, index) => {

          let date;
          if (position === "previous") {
            const day = daysInPrevMonth - (daysFromPreviousMonth - (index+1))
            date = `${previousMonthYear}-${previousMonth}-${day}`
          } else if (position === "next") {
            const day = (index+1) - (daysFromPreviousMonth + daysInMonth)
            date = `${nextMonthYear}-${nextMonth}-${day}`
          } else {
            const day = (index+1) - daysFromPreviousMonth 
            date = `${currentMonthYear}-${currentMonth}-${day}`
            // console.log(index, date);
          }
          
          return (
            <Day
              key={date}
              datePicker={datePicker}
              position={position}
              date={date}
              setDatePicker={setDatePicker}
              index={index+1}
              onChange={onChange}
            />
          )
        })}
      </div>
    </div>
  );
}

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const MONTHS = ["January", "February","March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const getMonthFirstDay = (month: number, year: number) => {
  return +(new Date(`${year}-${`${month}`.padStart(2, '0')}-01`).getDay()) + 1;
}