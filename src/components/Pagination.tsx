import React, { useState } from 'react'
import previous from "assets/previous.svg"
import { twMerge } from 'tailwind-merge'
import Previous from './icons/Previous'

type Props = {
  totalPages: number
  activePage: number
  handlePageChange?: (page: number) => void
  className?: React.ComponentProps<'div'>['className']
}

type PageButtonProps = {
  children: any
  isCurrentPage?: boolean
  page: number

}

export default function Pagination({totalPages=1, activePage=1, handlePageChange, className}: Props) {

  const [currentPage, setCurrentPage] = useState<number>(activePage)

  if (activePage > totalPages) {
    return <p className='text-red-500'></p>
  }

  const getPage = (index: number): number => {
    if(index === 1){
      return 1 
    } else if(index === 2) {
      if(2 >= totalPages) return -1
      if(currentPage > 4) return 0
      return 2
    } else if(index === 3) {
      if(3 >= totalPages) return -1
      if(currentPage <= 3) return 3
      if(currentPage > (totalPages - 3)) return totalPages - 4
      return currentPage - 1
    } else if(index === 4) {
      if(totalPages <= 4) return -1
      if(currentPage < 4) return 4
      if(currentPage > (totalPages - 3)) return totalPages - 3
      return currentPage
    } else if(index === 5) {
      if(totalPages <= 5) return -1
      if(currentPage < 5) return 5
      if(currentPage > (totalPages - 3)) return totalPages - 2
      return currentPage + 1
    } else if(index === 6) {
      if(6 >= totalPages) return -1
      if((totalPages - currentPage) > 3) return 0
      return totalPages - 1
    } else {
      return totalPages
    }
  }

  return (
    <div className={twMerge(`flex gap-2 justify-between items-center text-sm`, className)}>
      <div className={`flex items-center gap-x-2 font-semibold ${currentPage > 1 ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600" : "cursor-context-menu"} rounded-lg py-2 px-2 lg:px-6`} onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}>
        {/* <img src={previous} alt="" className="w-3 lg:w-4 h-auto" /> */}
        <Previous className="w-3 lg:w-4 h-auto stroke-gray-600 dark:stroke-gray-200" />
        <span className="dark:text-gray-200 text-sm lg:text-base hidden sm:inline">Previous</span> 
      </div>
      <div className="flex gap-[2px] md:gap-2">
        {
          new Array(7).fill("").map((s, i) => {
            const page = getPage(i+1)

            const isCurrentPage = page === currentPage
            const onClick = () => {
              if(page) {
                setCurrentPage(page)
                handlePageChange?.(page)
              }
            }
            return (
              <React.Fragment key={i}>
                {
                  page === -1 ?
                  <></> :
                  page === 0 ?
                  <Ellipse /> :
                  <span onClick={onClick} className={`rounded-full flex justify-center border-[1px] items-center w-6 h-6 lg:w-10 lg:h-10 font-semibold ${isCurrentPage ? "bg-gray-100 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-200 text-gray-800 border-gray-100" : "text-gray-700 dark:text-gray-200 border-transparent hover:border-gray-300 dark:hover:border-gray-700"} cursor-pointer transition-all text-sm sm:text-base`}>{page}</span>
                }
              </React.Fragment>
            )
          })
        }
      </div>
      <div className={`flex items-center gap-x-2 font-semibold ${currentPage < totalPages ? "hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer" : "cursor-context-menu"} rounded-lg py-2 px-2 lg:px-6`} onClick={() => setCurrentPage(currentPage < +totalPages ? currentPage + 1 : +totalPages)}>
        <span className="dark:text-gray-200 text-sm lg:text-base hidden sm:inline">Next</span> 
        <Previous className="rotate-180 w-3 lg:w-4 h-auto stroke-gray-600 dark:stroke-gray-200" />
        {/* <img src={previous} alt="" className=" rotate-180" /> */}
      </div>
    </div>
  )
}

const Ellipse = () => {
  return (
    <span className={`rounded-lg flex justify-center p-1 items-end w-6 h-6 lg:w-10 lg:h-10 text-sm sm:text-base font-semibold dark:text-gray-200`}>...</span>
  )
}
