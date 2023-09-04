import React from 'react'

type Props = {
  className?: React.ComponentProps<'svg'>["className"]
  onClick?: React.ComponentProps<'svg'>["onClick"]
}

export default function Clock({className, onClick}: Props) {
  return (
    <svg className={className} onClick={onClick} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_69_1203)">
      <path d="M9.99984 4.99996V9.99996L13.3332 11.6666M18.3332 9.99996C18.3332 14.6023 14.6022 18.3333 9.99984 18.3333C5.39746 18.3333 1.6665 14.6023 1.6665 9.99996C1.6665 5.39759 5.39746 1.66663 9.99984 1.66663C14.6022 1.66663 18.3332 5.39759 18.3332 9.99996Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
      <clipPath id="clip0_69_1203">
      <rect width="20" height="20" fill="transparent"/>
      </clipPath>
      </defs>
    </svg>

  )
}