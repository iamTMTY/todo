import React from 'react'

type Props = {
  className?: React.ComponentProps<'svg'>["className"]
  onClick?: React.ComponentProps<'svg'>["onClick"]
}

export default function Menu({className, onClick}: Props) {
  return (
    <svg className={className} onClick={onClick} width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="0.5" width="40" height="40" rx="8"/>
      <path d="M11 20.5H23M11 14.5H29M11 26.5H29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>


  )
}