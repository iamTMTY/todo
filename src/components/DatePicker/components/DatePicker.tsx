import React from "react";
import Month from "./Month";
import BottomControl from "./BottomControl";
import { DatePickerProps } from "../types";
import { twMerge } from "tailwind-merge";



type Props = {
  datePickerProps: DatePickerProps
  setDatePickerProps: React.Dispatch<React.SetStateAction<DatePickerProps>>
  handleCancel?: () => void
  onChange: (data: DatePickerProps) => void
  className?: React.ComponentProps<'div'>['className']
}

export default function DatePicker({datePickerProps, setDatePickerProps, onChange, className}: Props) {

  // for datePicker to work you must provide a react state similar to the one below or simply use the useDatePicker hook in the index.js file

  // const [datePicker, setDatePicker] = useState({
  //   year: new Date().getFullYear(),
  //   month: new Date().getMonth() + 1,
  //   date: new Date().getDate(),
  //   startDate: "",
  //   endDate: "",
  //   isCustom: false,
  //   showAll: true,
  //   error: "",
  //   title: "All"
  //   isRange: true
  // })
  
  return (
    <div className={twMerge("min-w-[300px]", className)}>
      <div className="flex rounded-lg w-full">
        <div className="flex flex-col w-full">
          <div className="flex w-full">
            <Month 
              datePicker={datePickerProps} 
              setDatePicker={setDatePickerProps} 
              onChange={onChange}
            />
          </div>
          {
            datePickerProps?.isRange ?
            <>
              <hr className='w-full h-[1px] bg-slate-300' />
              <BottomControl datePicker={datePickerProps} />
            </> :
            <></>
          }
        </div>
      </div>
    </div>
  )
}