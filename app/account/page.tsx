
import React, { useEffect } from 'react'
import Link from 'next/link'
import { auth } from '@/auth'
import { signOut } from '@/auth'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import formatTimeDifference from '@/lib/format-date'
import Image from 'next/image'
import Logout from '@/components/common/logout'


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
                <Button className='my-2' variant={'outline'} size={'xs'}>Log out</Button>
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
                        {!session?.user?.dealer ? "DEALER" : "USER" }
                        </h2>
                        
                        <InfoCircledIcon className='h-6 w-6'/>

                    </div>
                    <p className="text-xs opacity-50">No Records Found</p>
                   
            </div>

            <div className="border-x border-red-50 opacity-10"></div>

            <div className="space-y-2 py-2 flex-grow">
                    <p className="text-sm opacity-50">Ad Limit</p>
                    <div className="flex justify-between items-center">
                        <h2 className="Price text-xl md:text-2xl font-extrabold"> 
                        {session?.user?.adLimit}
                        </h2>
                        
                        <InfoCircledIcon className='h-6 w-6'/>

                    </div>
                    <p className="text-xs opacity-50">Post upto {session?.user?.adLimit} Cars</p>
                   
            </div>

            <div className="border-x border-red-50 opacity-10"></div>

            <div className="space-y-2 py-2 flex-grow">
                    <p className="text-sm opacity-50">Ghost Since</p>
                    <div className="flex justify-between items-center">
                        <h2 className="Price text-xl md:text-2xl font-extrabold"> 
                        {formatTimeDifference(session?.user?.date_joined as Date)}
                        </h2>
                        
                        <InfoCircledIcon className='h-6 w-6'/>

                    </div>
                    <p className="text-xs opacity-50">{"You're doing great"}</p>
                   
            </div>

           
        </div>

        <div className="m-2 md: my-10 grid grid-cols-2 gap-4">
                <Link href={"/account/my-ads"}  className="bg-card hover:bg-white/10 transition-all cursor-pointer 
                            flex justify-between p-4 rounded-xl
                            flex-col items-center
                            md:flex-row h-32">
                  <div className="text-wrap order-2  w-full md:order-1">
                    <h3 className="text-primary text-xs hidden md:inline">YOUR LISTINGS</h3>
                    <h2 className="font-medium text-base md:text-lg self-start">My Ads</h2>
                    <p className=" text-sm hidden md:inline">Manage Your Ads</p>
                  </div>
                  <Image className="w-2/3 h-auto  order-1 md:w-auto md:h-full md:order-2" width={200} height={100} src={`/media/services/my-ads.png`} alt='my Ads'/>
                </Link>
                <Link href={"/services"}  className="bg-card hover:bg-white/10 transition-all cursor-pointer 
                            flex justify-between p-4 rounded-xl
                            flex-col items-center
                            md:flex-row h-32">
                  <div className="text-wrap order-2  w-full md:order-1">
                    <h3 className="text-primary text-xs hidden md:inline">GET THEM NOW</h3>
                    <h2 className="font-medium text-base md:text-lg self-start">GP Services</h2>
                    <p className=" text-sm hidden md:inline">Check GP Services</p>
                  </div>
                  <Image className="w-2/3 h-auto  order-1 md:w-auto md:h-full md:order-2" width={200} height={100} src={`/media/services/services.webp`} alt='Services'/>
                </Link>
                <Link href={"/account/upgrade"}  className="bg-card hover:bg-white/10 transition-all cursor-pointer 
                            flex justify-between p-4 rounded-xl
                            flex-col items-center
                            md:flex-row h-32">
                  <div className="text-wrap order-2  w-full md:order-1">
                    <h3 className="text-primary text-xs hidden md:inline">UPGRADE ACCOUNT</h3>
                    <h2 className="font-medium text-base md:text-lg self-start">Ghost Subscription</h2>
                    <p className=" text-sm hidden md:inline">Get more Ad Limit and Featured Listings</p>
                  </div>
                  <Image className="w-2/3 h-auto  order-1 md:w-auto md:h-full md:order-2" width={200} height={100} src={`/media/services/services.webp`} alt='Upgrade Account'/>
                </Link>
        </div>

        <Logout/>
      


    </div>
  )
}

export default Account