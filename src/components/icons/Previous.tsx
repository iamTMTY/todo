import React from 'react'

type Props = {
  className?: React.ComponentProps<'svg'>["className"]
  onClick?: React.ComponentProps<'svg'>["onClick"]
}

export default function Previous({className, onClick}: Props) {
  return (
    <svg className={className} onClick={onClick} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.8334 6.99996H1.16675M1.16675 6.99996L7.00008 12.8333M1.16675 6.99996L7.00008 1.16663" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>


  )
}