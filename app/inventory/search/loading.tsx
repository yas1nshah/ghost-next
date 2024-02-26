import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
  return (
    <div>
        <div className="flex gap-4 flex-wrap md:flex-nowrap">
            <Skeleton className='w-full md:w-1/3 h-14 md:h-96 p-4 space-y-5'/>
            <div className="w-full md:w-2/3 space-y-4">
                <Skeleton className='w-full h-10'/>
                <Skeleton className=' w-full md:h-10'/>
                <Skeleton className='w-full h-40'/>
                <Skeleton className='w-full h-40'/>
                <Skeleton className='w-full h-40'/>
                <Skeleton className='w-full h-40'/>
            </div>
        </div>
        
    </div>
  )
}

export default Loading