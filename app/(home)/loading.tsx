import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
  return (
    <div>
        <div className="flex gap-4 flex-wrap md:flex-nowrap">
            <Skeleton className='w-full md:w-1/3 h-40 md:h-80 p-4 space-y-5'/>
            <Skeleton className='w-full md:w-2/3 h-10 md:h-80'/>
        </div>
        <div className="my-4">
            <Skeleton className='w-full  h-10 hidden md:block'/>
        </div>
        <div className="mt-10 flex justify-between">
            <Skeleton className='w-1/3  h-10 hidden md:block'/>
            <Skeleton className='w-1/6  h-10 hidden md:block'/>
        </div>
        <div className="my-4 gap-4 flex justify-between">
            <Skeleton className='w-1/2 md:w-1/4  h-60 '/>
            <Skeleton className='w-1/2 md:w-1/4  h-60'/>
            <Skeleton className=' md:w-1/4  h-60 hidden md:block'/>
            <Skeleton className=' md:w-1/4  h-60 hidden md:block'/>
        </div>
    </div>
  )
}

export default Loading