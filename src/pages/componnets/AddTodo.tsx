import React, {useState, useMemo} from 'react'
import close from "assets/close.svg"
import bell from "assets/bell2.svg"
import calendar from "assets/calendar.svg"
import Button from 'components/Button'
import { DatePicker, MONTHS, useDatePicker } from 'components/DatePicker'
import { getDate, getMonth, getYear, isToday } from 'date-fns'
import { Action, TodoState } from 'types'
import toast from 'react-hot-toast'
import { twMerge } from 'tailwind-merge'

type Props = {
  action: Action
  setAction:  React.Dispatch<React.SetStateAction<Action>>
  setTodo:  React.Dispatch<React.SetStateAction<TodoState>>
  className?: React.ComponentProps<'div'>['className']
}

export default function AddTodo({setAction, setTodo, action, className}: Props) {
  
  const {datePickerProps, setDatePickerProps} = useDatePicker({startDate: new Date(action.data?.date || "")})
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTenMinutes, setShowTenMinutes] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const isEdit = useMemo(() => action.type === "edit", [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    showDatePicker && setShowDatePicker(false)
    setIsLoading(true)
    const target = e.target as HTMLFormElement
    const title = new FormData(target).get("title") as string
    const startTime = new FormData(target).get("startTime")
    const endTime = new FormData(target).get("endTime")
    const date = new Date(datePickerProps.startDate)

    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos${isEdit ? `/${action.data?.id}` : ""}`, {
        method: isEdit ? 'PUT' :'POST',
        body: JSON.stringify({
          ...(isEdit ? {id: action.data?.id} : {}),
          title: title,
          body: title,
          startTime,
          endTime,
          date,
          userId: 1,
          completed: action?.data?.completed
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      const data = await res.json()
      setTodo((prev) => ({
        ...prev,
        data: isEdit ? prev.data.map(prevData => prevData.id === action.data?.id ? data : prevData) : [data, ...prev.data]
      }))
      setAction({type: "default"})
      toast.success(isEdit ? "Task Updated" : "Task Created")
    } catch (error: any) {
      toast.error(error?.message || isEdit ? "Error updating task" : "Error creating task");  
    }

    setIsLoading(false)
    // console.log(title, startTime, endTime, date);
    
    
  }
  
  return (
    <form onSubmit={handleSubmit} className={twMerge("flex flex-col gap-4", className)}>
      <div className="flex justify-between items-center">
        <h4 className="font-semibold dark:text-gray-200">{isEdit ? "Edit Task" : "Add Task"}</h4>
        <img src={close} className="cursor-pointer" alt="x mark" onClick={() => setAction({type: "default"})} />
      </div>
      <textarea name="title" defaultValue={action?.data?.title || ""} disabled={isLoading} required={true} className="border-[1px] rounded-lg border-gray-300 dark:border-gray-400 bg-gray-50 min-h-[100px] dark:bg-gray-600 dark:text-gray-200 w-full p-4" rows={4} />
      <div className="flex justify-between gap-4 text-sm">
        <div 
          className="flex justify-center items-center gap-x-2 py-1 px-2 rounded-lg border-[1px] border-gray-300 dark:border-gray-400 dark:bg-gray-600 dark:text-gray-200 w-full md:w-max cursor-pointer"
          onClick={() => !isLoading && setShowDatePicker(prev => !prev)}
        >
          <img src={calendar} className="w-4 h-4" />
          <span className="w-[110px]">{isToday(new Date(datePickerProps.startDate)) ? "Today" : getTitle(datePickerProps.startDate)}</span>
        </div>
        <input name="startTime" defaultValue={action?.data?.startTime || ""} disabled={isLoading} required={true} className="rounded-lg border-[1px] border-gray-300 dark:border-gray-400 dark:bg-gray-600 dark:text-gray-200 py-1 px-2 w-full md:w-max" type="time" />
        <input name="endTime" defaultValue={action?.data?.endTime || ""}disabled={isLoading} required={true} className="rounded-lg border-[1px] border-gray-300 dark:border-gray-400 dark:bg-gray-600 dark:text-gray-200 py-1 px-2 w-full md:w-max" type="time" />
      </div>
      {/* <div className={`overflow-auto ${showDatePicker ? "h-max" : "h-0"} `}> */}
        <DatePicker 
          className={`w-full transition-[height] ${showDatePicker ? "h-[400px]" : "h-0 overflow-hidden"} `}
          datePickerProps={datePickerProps} 
          setDatePickerProps={setDatePickerProps}
          onChange={() => {
          }} 
        />
      {/* </div> */}
      <div className={`flex justify-between items-center`}>
        <div className="font-medium flex items-center gap-x-2 dark:text-gray-200"><img src={bell} alt="x mark" /><span className={showTenMinutes ? "" : "line-through"}>10 minutes before</span></div>
        <img src={close} alt="x mark" className="cursor-pointer" onClick={() => setShowTenMinutes(prev => !prev)} />
      </div>
      <div className="flex items-center gap-3 w-full">
        <Button disabled={isLoading} onClick={() => setAction({type: "default"})} className="w-full bg-transparent border-gray-300 dark:border-gray-400 dark:text-gray-200 text-gray-800">Cancel</Button>
        <Button className="w-full" type="submit" disabled={isLoading} isLoading={isLoading}>{isEdit ? "Save" : "Add"}</Button>
      </div>
    </form>
  )
}

const getTitle = (date: string) => {
  return `${MONTHS[getMonth(new Date(date))].slice(0, 3)}, ${getDate(new Date(date))} ${getYear(new Date(date))}`
}