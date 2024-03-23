import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
  return (
    <div>
        <Skeleton className='w-full  h-30 md:h-40 p-4 space-y-5'/>
        <div className="my-4 flex justify-end pb-4">
            <Skeleton className='w-full max-w-40 h-10 hidden md:block'/>
        </div>

        <Skeleton className='w-full  h-30 md:h-40 p-4 space-y-5'/>
        <div className="my-4 flex justify-end pb-4">
            <Skeleton className='w-full max-w-40 h-10 hidden md:block'/>
        </div>
        
        <Skeleton className='w-full  h-30 md:h-40 p-4 space-y-5'/>
        <div className="my-4 flex justify-end pb-4">
            <Skeleton className='w-full max-w-40 h-10 hidden md:block'/>
        </div>
        
        <Skeleton className='w-full  h-30 md:h-40 p-4 space-y-5'/>
        <div className="my-4 flex justify-end pb-4">
            <Skeleton className='w-full max-w-40 h-10 hidden md:block'/>
        </div>
        
    </div>
  )
}

export default Loading