import Button from 'components/Button'
import Header from 'components/Header'
import Pagination from 'components/Pagination'
import { add, getDate, getDay, getMonth, getYear, isEqual, isToday, sub } from 'date-fns'
import { useState, useCallback, useEffect } from 'react'
import {DatePicker, MONTHS, DAYS, useDatePicker} from "components/DatePicker"
import AddTodo from './componnets/AddTodo'
import ViewTodo from './componnets/ViewTodo'
import { Action, TodoState } from 'types'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Modal from 'components/Modal'

type Props = {}
const PAGE_SIZE = 5

export default function Home({}: Props) {

  const [todo, setTodo] = useState<TodoState>({
    data: [],
    isLoading: true,
    error: ""
  })
  const [page, setPage] = useState(1)
  const [action, setAction] = useState<Action>({type: "default"})
  const {datePickerProps, setDatePickerProps} = useDatePicker()
  const [currentDate, setCurrentDate] = useState<Date>(new Date())

  const fetchTodo = useCallback(async() => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos")
      const data = await res.json()
      setTodo({data, isLoading: false, error: ""})
    } catch (error: any) {
      setTodo({data: [], isLoading: false, error: error?.message || "Error fetching todos"})
    }
  }, [])

  useEffect(() => {
    fetchTodo()
  }, [fetchTodo])
  

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen pb-[90px] md:pb-0">
      <Header />
      <div className="py-12 px-4 xl:px-20 flex flex-col gap-y-6 w-full mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-y-4 sm:flex-row justify-between">
          <div>
            <h2 className="text-gray-900 dark:text-gray-200 text-3xl font-semibold">Good Morning!</h2>
            <p className="text-gray-600 dark:text-gray-200">You got some task to do. </p>
          </div>
          <Button className="items-center gap-2 hidden md:flex" onClick={() => setAction({type:"add"})}>
            <img />
            <span>Create New Task</span>
          </Button>
        </div>
        <div className="flex">
          <div className="w-full md:w-[calc(100%-330px)] lg:w-8/12 md:border-r-[1px] border-r-gray-300 dark:border-r-gray-700 md:pr-6 flex flex-col gap-y-8">
            <div>
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-gray-200">{MONTHS[getMonth(currentDate)]} {getYear(currentDate)}</h3>
              <div className="flex overflow-x-hidden gap-4">
                {
                  new Array(11).fill("").map((s, i) => {
                    const date = i < DAY_OFFSET ? sub(currentDate, {days: DAY_OFFSET - i}) : add(currentDate, {days: i - DAY_OFFSET})

                    return (
                      <div onClick={() => {
                        setCurrentDate(date)
                        setDatePickerProps((prev) => ({
                          ...prev,
                          startDate: `${getYear(date)}-${getMonth(date)}-${getDate(date)}`
                        }))
                      }} key={i} className={`h-[50px] md:h-[68px] w-full border-[1px] ${isEqual(currentDate, date) ? "text-white bg-primary border-primary" : "text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-500 dark:hover:border-primary hover:border-primary"} transition-all cursor-pointer font-semibold rounded-lg flex flex-col items-center justify-center text-sm min-w-[33px]`}>
                        <span>{DAYS[getDay(date)].slice(0, 3)+s}</span>
                        <span>{getDate(date)}</span>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-gray-200">My Tasks</h3>
              <div className="flex flex-col gap-y-2">
                {
                  todo.isLoading ? 
                  <Skeleton enableAnimation={false} className="w-full h-[77px] bg-gray-200 dark:bg-gray-700 mb-2" count={5} /> : 
                  todo.error ?
                  <p className='w-full dark:text-gray-200 text-center'>{todo.error}</p> :
                  todo.data.slice((page-1)*PAGE_SIZE, ((page-1)*PAGE_SIZE) + PAGE_SIZE).map((t, i) => (
                    <div key={t.id + i + t.title} onClick={() => setAction({type: "view", data: t})} className={`flex items-center justify-between ${action.type === "view" && t.id === action.data?.id ? "dark:bg-primary dark:bg-opacity-30 bg-secondary" : "bg-gray-50 dark:bg-gray-700"} w-full px-6 py-4 gap-x-4 border-b-[1px] border-b-gray-200 dark:border-b-gray-500 text-sm cursor-pointer`}>
                      <div className='flex items-center gap-x-3'>
                        <input type="checkbox" checked={t.completed} onChange={(e) => {
                          e.stopPropagation()
                          setTodo(prev => ({
                            ...prev,
                            data: prev.data.map(prevData => {
                              let newData = prevData
                              if(prevData.id === t.id) {
                                newData = {...prevData, completed: e.target.checked}
                                setAction({type: "view", data: newData})
                              }
                              return newData
                            })
                          }))
                        }} className="w-5 h-5" />
                        <div className="flex flex-col gap-y-1">
                          <span className={`font-medium ${t.completed ? "text-[#D0D5DD] dark:text-gray-500 line-through" : "text-black dark:text-gray-200"}`}>{t.title}</span>
                          <span className={`${t.completed ? "text-[#D0D5DD] dark:text-gray-500 line-through" : "text-black dark:text-gray-200"}`}>{t?.startTime || "10:30 am"} - {t?.endTime || "11:30 am"}</span>
                        </div>
                      </div>
                      <span className="dark:text-gray-200">{t?.date ? (isToday(new Date(t.date)) ? "Today" : new Date(t.date).toDateString()) : "Today"}</span>
                    </div>
                  ))
                }

              </div>
            </div>
            {!todo.isLoading && <Pagination className="border-t-[1px] border-gray-200 dark:border-gray-700 py-6" totalPages={Math.ceil(todo.data.length/PAGE_SIZE)} activePage={page} handlePageChange={(page) => setPage(page)} />}
          </div>
          <div className="hidden md:block w-[330px] lg:w-4/12 pl-6">
            {action.type === "default" && <div className={`shadow-card dark:shadow-card_dark rounded-lg overflow-hidden animate-opacity`}>
              <DatePicker 
                className="w-full"
                datePickerProps={datePickerProps} 
                setDatePickerProps={setDatePickerProps}
                onChange={(date) => {
                  setCurrentDate(new Date(date.startDate))
                }} 
              />
            </div>}
            {(action.type === "add" || action.type === "edit") && <div className={`shadow-card dark:shadow-card_dark py-5 px-6 rounded-lg overflow-hidden animate-opacity`}>
              <AddTodo action={action} setTodo={setTodo} setAction={setAction} />
            </div>}
            {action.type === "view" && <div className={`shadow-card dark:shadow-card_dark py-5 px-6 rounded-lg overflow-hidden animate-opacity`}>
              <ViewTodo setTodo={setTodo} setAction={setAction} data={action.data!} />
            </div>}
          </div>
        </div>
      </div>
      <div className="block md:hidden">
        <div className="flex fixed h-[90px] dark:bg-gray-900 bg-white bottom-0 left-0 py-6 px-5 w-full shadow-card dark:shadow-card_dark">
          <div onClick={() => setAction({type:"add"})} className="w-full h-full text-black dark:text-gray-600  rounded-lg border-[1px] border-gray-200 dark:border-gray-600 flex items-center px-6 cursor-pointer">
            Input Task
          </div>
        </div>
        {
          MODAL_ACTIONS.includes(action.type) &&
          <Modal className="flex items-end" handleClose={() => setAction({type: "default"})}>
            {
              (action.type === "add" || action.type === "edit") && 
              <AddTodo 
                action={action} 
                setTodo={setTodo} 
                setAction={setAction} 
                className={`bg-white dark:bg-gray-900 w-full md:w-auto p-4 rounded-tr-2xl rounded-tl-3xl h-[80vh] overflow-y-auto ${action.type === "add" ? "animate-modal_height" : ""}`}
              />
            }
            {
              action.type === "view" && 
              <ViewTodo 
                setTodo={setTodo} 
                setAction={setAction} 
                data={action.data!} 
                className={`bg-white dark:bg-gray-900 w-full md:w-auto p-4 rounded-tr-2xl rounded-tl-3xl h-[80vh] overflow-y-auto animate-modal_height`}
              />
            }
          </Modal>
        }
      </div>
    </div>
  )
}

const MODAL_ACTIONS = ["add", "view", "edit"]

const DAY_OFFSET = 2