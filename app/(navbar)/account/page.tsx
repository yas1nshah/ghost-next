
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
import { ArrowTopRightIcon, HeartIcon, SectionIcon, MagicWandIcon, CookieIcon, GlobeIcon, InstagramLogoIcon, FigmaLogoIcon, FramerLogoIcon, CrumpledPaperIcon  } from '@radix-ui/react-icons'
import { ModeToggle } from '@/components/theme-switcher'
import ResetCache from '@/components/account/reset-cache'


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

      

        <div className="my-6 bg-card px-4 py-2 rounded-xl">
          <Link href={'account/favourites'} className="flex justify-between items-center gap-4">
            <HeartIcon/>
            <p className='flex-grow'>Favorites</p>
            <ArrowTopRightIcon/>
          </Link>
        </div>

        <div className="my-6 bg-card px-4 py-2 rounded-xl">
          <Link href={'/account/my-ads'} className="flex justify-between items-center gap-4 my-2">
            <SectionIcon/>
            <p className='flex-grow'>My Ads</p>
            <ArrowTopRightIcon/>
          </Link>

          <hr />

          <Link href={'/services'} className="flex justify-between items-center gap-4 my-2">
            <MagicWandIcon/>
            <p className='flex-grow'>GP Services</p>
            <ArrowTopRightIcon/>
          </Link>

          <hr />

          <div className="flex justify-between items-center gap-4 my-2">
            <CookieIcon/>
            <p className='flex-grow'>Account Subscription</p>
            <ArrowTopRightIcon/>
          </div>
        </div>
        
        <div className="my-6 bg-card px-4 py-2 rounded-xl">
          <div className="flex justify-between items-center gap-4 my-2">
            <SectionIcon/>
            <p className='flex-grow'>Theme</p>
            <ModeToggle/>
          </div>

          <hr />

          <ResetCache/>
          
        </div>
        
        <div className="my-6 bg-card px-4 py-2 rounded-xl">
          <Link href={'/about-us'} className="flex justify-between items-center gap-4 my-2">
            <GlobeIcon/>
            <p className='flex-grow'>About Us</p>
            <ArrowTopRightIcon/>
          </Link>

          <hr />

          <Link href={'www.instagram.com/ghostprotocolspk/'} target='_blank' className="flex justify-between items-center gap-4 my-2">
            <InstagramLogoIcon/>
            <p className='flex-grow'>Instagram</p>
            <ArrowTopRightIcon/>
          </Link>

          <hr />

          <Link href={'https://www.facebook.com/ghostprotocolspk'} target='_blank' className="flex justify-between items-center gap-4 my-2">
            <FigmaLogoIcon/>
            <p className='flex-grow'>Facebook</p>
            <ArrowTopRightIcon/>
          </Link>

          <hr />

          <Link href={'https://www.tiktok.com/@ghostprotocolspk'} target='_blank' className="flex justify-between items-center gap-4 my-2">
            <FramerLogoIcon/>
            <p className='flex-grow'>Tiktok</p>
            <ArrowTopRightIcon/>
          </Link>
        </div>

        <div className="my-6 bg-card px-4 py-2 rounded-xl">
          <Link href={'https://www.tiktok.com/@ghostprotocolspk'}  className="flex justify-between items-center gap-4">
            <CrumpledPaperIcon/>
            <p className='flex-grow'>Developed by <span className='font-semibold text-primary'>Tixy.pk</span></p>
            <ArrowTopRightIcon/>
          </Link>
        </div>
        <Logout/>
      


    </div>
  )
}

export default Account