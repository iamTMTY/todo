import React, {useState} from 'react'
import close from "assets/close.svg"
import Calendar from 'components/icons/Calendar'
import Clock from 'components/icons/Clock'
import Button from 'components/Button'
import { Action, Todo, TodoState } from 'types'
import toast from 'react-hot-toast'
import { twMerge } from 'tailwind-merge'

type Props = {
  setTodo:  React.Dispatch<React.SetStateAction<TodoState>>
  setAction:  React.Dispatch<React.SetStateAction<Action>>
  className?: React.ComponentProps<'div'>['className']
  data:  Todo
}

export default function ViewTodo({setAction, data, setTodo, className}: Props) {

  const [isLoading, setIsLoading] = useState(false)

  const deleteTodo = async() => {
    setIsLoading(true)
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${data.id}`, {
        method: 'DELETE',
      });
      setAction({type: "default"})
      setTodo(prev => ({
        isLoading: false,
        error: "",
        data: prev.data.filter(prevData => prevData.id !== data.id)
      }))
      toast.success("Task Deleted")
    } catch (error) {
      
    }
    setIsLoading(false)
  }

  return (
    <div className={twMerge("flex flex-col gap-4", className)}>
      <div className="flex justify-between items-center">
        <h4 className="font-semibold"></h4>
        <img src={close} onClick={() => setAction({type: "default"})} alt="x mark" className="cursor-pointer" />
      </div>
      <h4 className="font-semibold dark:text-gray-200">{data.title}</h4>
      <div className='flex flex-col gap-y-2'>
        <div className="flex gap-x-4  items-center">
          <Calendar className="stroke-primary" />
          <span className="font-medium dark:text-gray-200">{data?.date ? new Date(data.date).toDateString() : "20th January, 2023"}</span>
        </div>
        <div className="flex gap-x-4  items-center">
          <Clock className="stroke-primary" />
          <span className="font-medium dark:text-gray-200">{data?.startTime || "10:30 am"} - {data?.endTime || "11:30 am"}</span>
        </div>
      </div>
      <div className="flex items-center gap-3 w-full">
        <Button onClick={deleteTodo} isLoading={isLoading} disabled={isLoading} className="w-full bg-transparent border-gray-300 text-gray-800 dark:text-gray-200">Delete</Button>
        <Button className="w-full" onClick={() => setAction({type: "edit", data})}>Edit</Button>
      </div>
    </div>
  )
}