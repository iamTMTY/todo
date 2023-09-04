import React, {useEffect} from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  className?: React.ComponentProps<'div'>['className']
  handleClose?: () => void
  children?:any
}

export default function Modal({className, children, handleClose}: Props) {

  useEffect(() => {
    const body = document.querySelector("body") as HTMLBodyElement
    body.style.overflow = "hidden"

    return () => {
      body.style.overflow = "auto"
    }
  }, [])
  
  return (
    <div onClick={(e) => {
      const target = e.target as HTMLDivElement
      target.classList.contains("app-modal") && handleClose?.()
    }} className={twMerge("bg-[#00000090] app-modal fixed w-full h-screen top-0 left-0", className)}>
      {children}
    </div>
  )
}