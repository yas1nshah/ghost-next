import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
  return (
    <div className='space-y-4'>
        <Skeleton className='w-full h-60 p-4 space-y-5'/>
        <Skeleton className='w-full h-60 p-4 space-y-5'/>
        <Skeleton className='w-full h-60 p-4 space-y-5'/>
        
    </div>
  )
}

export default Loading