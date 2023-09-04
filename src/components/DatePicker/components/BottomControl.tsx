import React from 'react'
import { getDate, getMonth, getYear } from 'date-fns'
import { DatePickerProps } from '../types'

type Props = {
  datePicker: DatePickerProps
  onChange: (date: DatePickerProps) => void
}

export default function BottomControl({datePicker, onChange}: Props) {

  const {startDate, endDate, error, isCustom, title} = datePicker
  const startDateTitle = startDate ? `${MONTHS[getMonth(new Date(startDate))].slice(0, 3)},${getDate(new Date(startDate))} ${getYear(new Date(startDate))}`: ""
  const endDateTitle = endDate ? `${MONTHS[getMonth(new Date(endDate))].slice(0,3)},${getDate(new Date(endDate))} ${getYear(new Date(endDate))}` : ""

  return (
    <>
      <div className='flex justify-between py-3 px-8'>
        {
          isCustom ? 
          <div className='flex gap-2 items-center'>
            <p className="w-28 h-10 rounded-lg border border-[#D0D5DD] flex justify-center items-center">
              {startDateTitle}
            </p>
            <hr className="w-2 h-[2px] bg-[#667085]" />
            <p className="w-28 h-10 rounded-lg border border-[#D0D5DD] flex justify-center items-center">
              {endDateTitle}
            </p>
          </div> :
          <div></div>
        }
        
        {/* <div className='flex gap-2'>
          <button onClick={() => {
          }} className='w-24 h-10 rounded-lg text-sm border border-[#D0D5DD] bg-white'>Cancel</button>
          <button onClick={() => {
            onChange && onChange({...datePicker, title: isCustom ? `${startDateTitle} - ${endDateTitle}` : title})
          }} className='w-24 h-10 rounded-lg text-white text-sm bg-[#0048D3]'>Apply</button>
        </div> */}
      </div>
      <p className='text-center text-red-500 text-sm'>{error}</p>
    </>
  )
}

const MONTHS = ["January", "February","March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]