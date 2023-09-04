import React from 'react'
import { twMerge } from 'tailwind-merge'
import spinner from "assets/spinner.svg"

type Props = {
  className?: React.ComponentProps<'button'>['className']
  loadingClass?: React.ComponentProps<'img'>['className']
  onClick?: React.ComponentProps<'button'>["onClick"]
  type?: React.ComponentProps<'button'>["type"]
  isLoading?: boolean
  disabled?: boolean
  children?: any
}

export default function Button({children, className, onClick, disabled=false, isLoading=false, type, loadingClass}: Props) {
  return (
    <button onClick={onClick} type={type} disabled={disabled} className={twMerge("bg-primary text-white py-[10px] h-max w-max px-4 rounded-lg border-[1px] border-primary font-semibold flex justify-center", className)}>
      {
        isLoading ?
        <img src={spinner} className={twMerge("w-auto h-6", loadingClass)} /> :
        children
      }
    </button>
  )
}