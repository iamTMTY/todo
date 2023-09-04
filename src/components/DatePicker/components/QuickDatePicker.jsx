import React, { useMemo } from 'react'
import { addDays, addMonths, endOfMonth, endOfWeek, getMonth, getYear, startOfMonth, startOfWeek } from 'date-fns'

export default function QuickDatePicker({datePicker, setDatePicker}) {

  const {startDate, endDate, isCustom, showAll} = datePicker
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()
  const currentDate = new Date().getDate()
  
  const month = new Date().getMonth() + 1
  const quickPicks = useMemo(() => [
    {
      title: "Today",
      startDate: `${currentYear}-${month}-${currentDate}`,
      endDate: `${currentYear}-${month}-${currentDate}`
    },
    {
      title: "Tomorrow",
      startDate: addDays(new Date(currentYear, currentMonth, currentDate), 10),
      endDate: addDays(new Date(currentYear, currentMonth, currentDate), 10)
    },
    {
      title: "This Week",
      startDate: startOfWeek(new Date(currentYear, currentMonth, currentDate), { weekStartsOn: 1 }),
      endDate: endOfWeek(new Date(currentYear, currentMonth, currentDate), { weekStartsOn: 1 })
    },
    {
      title: "This Month",
      startDate: startOfMonth(new Date(currentYear, currentMonth, currentDate)),
      endDate: endOfMonth(new Date(currentYear, currentMonth, currentDate))
    },
    {
      title: "Next Month",
      startDate: addMonths(new Date(startOfMonth(new Date(currentYear, currentMonth, currentDate))), 1),
      endDate: addMonths(new Date(endOfMonth(new Date(currentYear, currentMonth, currentDate))), 1)
    },
    {
      title: "Last Year",
      startDate: `${+currentYear - 1}-01-01`,
      endDate: `${+currentYear - 1}-12-31`
    },
    {
      title: "All",
      startDate: "",
      endDate: ""
    },
    {
      title: "Custom",
      startDate: "",
      endDate: ""
    },
  ], [currentDate, currentYear, month])

  const getIsSelected = (pick) => {
    if(pick.title === "Custom" && isCustom) {
      return true 
    } else if(pick.title === "All" && showAll) {
      return true
    } else if (!isCustom && isEqual(new Date(startDate), new Date(pick.startDate)) && isEqual(new Date(endDate), new Date(pick.endDate)) ) {
      return true
    } else {
      return false
    }
  }

  const handleClick = (pick) => {
    if(pick.title === "Custom") {
      setDatePicker(prevState => ({
        ...prevState,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
        startDate: "", 
        endDate: "", 
        isCustom: true, 
        showAll: false,
        error: "",
        title: pick.title
      }))
    } else if(pick.title === "All") {
      setDatePicker(prevState => ({
        ...prevState,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
        startDate: "", 
        endDate: "",  
        isCustom: false, 
        showAll: true,
        error: "",
        title: pick.title
      }))
    } else {
      setDatePicker(prevState => ({
        ...prevState,
        year: getYear(new Date(pick.startDate)),
        month: getMonth(new Date(pick.startDate)), 
        startDate: pick.startDate, 
        endDate: pick.endDate, 
        showAll: false, 
        isCustom: false,
        error: "",
        title: pick.title
      }))
    }
  }

  return (
    <div className='flex'>
      <div className='flex flex-col p-4'>
        {quickPicks.map(pick => {
          const isSelected = getIsSelected(pick)
          return (
            <p 
              onClick={() => handleClick(pick)}
              key={pick.title} 
              className={`pl-4 pr-10 py-2 text-sm rounded-lg ${isSelected ? "bg-[#EDF2F7] text-[#0048D3]" : ""} hover:bg-[#EDF2F7] hover:text-[#0048D3] cursor-pointer`}
            >
              {pick.title}
            </p>
          )
        })}
      </div>
      <hr className='w-[1px] h-full bg-slate-300' />
    </div>
  )
}