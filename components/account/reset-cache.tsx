'use client'
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { ArrowTopRightIcon, CookieIcon } from '@radix-ui/react-icons'
import { toast } from 'sonner'



const ResetCache = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
      <div className="flex justify-between items-center gap-4 my-2 cursor-pointer">
            <CookieIcon/>
            <p className='flex-grow'>Reset Cache</p>
            <ArrowTopRightIcon/>
          </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will reset all of the cache.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={()=>{
            localStorage.clear();
            toast("Cache Deleted");
            }}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ResetCache