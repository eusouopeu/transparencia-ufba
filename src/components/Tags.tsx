import React from 'react'
import clsx from 'clsx'

interface TagsProps {
  children: React.ReactNode
  className?: string
}
export default function Tags({ children, className }: TagsProps) {
  return (
    <div className={clsx('flex h-fit w-fit py-[2px] px-[8px] rounded-full text-md text-white font-bold', className)}>
      {children}
    </div>
  )
}
