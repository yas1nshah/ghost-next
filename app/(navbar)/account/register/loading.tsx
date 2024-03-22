import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
  return (
    <div>
        <Skeleton className='w-1/3  h-10  md:block'/>

        <div className="my-4">
            <Skeleton className='w-full  h-10 hidden md:block'/>
        </div>
        <div className="flex gap-4 flex-wrap md:flex-nowrap">
            <Skeleton className='w-full md:w-2/3 h-10 md:h-80'/>
            <Skeleton className='w-full md:w-1/3 h-80 md:h-80 p-4 space-y-5'/>
        </div>
    </div>
  )
}

export default Loading