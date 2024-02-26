import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
  return (
    <div className='space-y-4'>
        <Skeleton className='w-full h-40'/>
        <Skeleton className='w-full h-10'/>
        <Skeleton className='w-full h-20'/>
        <Skeleton className='w-full h-10'/>
        <Skeleton className='w-full h-20'/>
        <Skeleton className='w-full h-10'/>
        <Skeleton className='w-full h-10'/>
       
        
    </div>
  )
}

export default Loading