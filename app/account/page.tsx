import React from 'react'
import Link from 'next/link'
import { auth } from '@/auth'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { InfoCircledIcon } from '@radix-ui/react-icons'

const Account = async() => {
    const session = await auth();
  return (
    <div className='space-y-4'>
        <div className="m-2">
        <h1 className='text-2xl md:text-4xl font-semibold'>Account</h1>
        <div className="text-xs md:text-sm breadcrumbs ">
              <ul>
                <li><Link href={"/"}>Home</Link></li> 
                <li><Link href={`/account`}>Account</Link></li> 
                
              </ul>
        </div>
        <hr className='opacity-30'/>
        </div>

        <div className="bg-card rounded-xl p-4 flex justify-between items-center ">
            <div>
                <h3 className='md:text-lg'>Welcome Back!! 👋</h3>
                <h2 className='md:text-3xl font-semibold'>{session?.user?.name}</h2>
            </div>
            <Avatar className='w-24 h-24 mx-4'>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>

        <div className="bg-card rounded-xl p-4 flex gap-4">
            <div className="space-y-2 py-2 flex-grow">
                    <p className="text-sm opacity-50">Account Type</p>
                    <div className="flex justify-between items-center">
                        <h2 className="Price text-xl md:text-2xl font-extrabold"> 
                        {session?.user?.role }
                        </h2>
                        
                        <InfoCircledIcon className='h-6 w-6'/>

                    </div>
                    <p className="text-xs opacity-50">No Records Found</p>
                   
            </div>

            <div className="border-x border-red-50 opacity-10"></div>

            <div className="space-y-2 py-2 flex-grow">
                    <p className="text-sm opacity-50">Ghost Inspection</p>
                    <div className="flex justify-between items-center">
                        <h2 className="Price text-xl md:text-2xl font-extrabold"> 
                        N/A
                        </h2>
                        
                        <InfoCircledIcon className='h-6 w-6'/>

                    </div>
                    <p className="text-xs opacity-50">No Records Found</p>
                   
            </div>

            <div className="border-x border-red-50 opacity-10"></div>

            <div className="space-y-2 py-2 flex-grow">
                    <p className="text-sm opacity-50">Ghost Inspection</p>
                    <div className="flex justify-between items-center">
                        <h2 className="Price text-xl md:text-2xl font-extrabold"> 
                        N/A
                        </h2>
                        
                        <InfoCircledIcon className='h-6 w-6'/>

                    </div>
                    <p className="text-xs opacity-50">No Records Found</p>
                   
            </div>
        </div>

    </div>
  )
}

export default Account