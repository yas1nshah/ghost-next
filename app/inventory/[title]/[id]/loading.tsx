import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
  return (
    <div className="flex gap-4">
        <div className="w-full md:w-2/3 space-y-4">
            <Skeleton className=' h-64 md:h-10 w-full'/>
            <Skeleton className=' h-10 md:h-64 w-full'/>
            <Skeleton className=' h-20 w-full'/>
            
            <div className="flex gap-4 w-full p-4">

            <div className='space-y-4 w-full'>
                <Skeleton className=' h-8 w-full'/>
                <Skeleton className=' h-8 w-full'/>
                <Skeleton className=' h-8 w-full'/>
                <Skeleton className=' h-8 w-full'/>
                <Skeleton className=' h-8 w-full'/>
            </div>
            <div className='space-y-4 w-full'>
                <Skeleton className=' h-8 w-full'/>
                <Skeleton className=' h-8 w-full'/>
                <Skeleton className=' h-8 w-full'/>
                <Skeleton className=' h-8 w-full'/>
                <Skeleton className=' h-8 w-full'/>
            </div>
            
            </div>
        </div>
        <div className="hidden md:block w-1/3 space-y-4">
            <Skeleton className='h-60 w-full'/>
            <Skeleton className='h-40 w-full'/>
            <Skeleton className='h-60 w-full'/>

        </div>
    </div>
  )
}

export default Loading