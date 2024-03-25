import React, { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import CarCarosel from '@/components/common/car-carousel'
import Hero from '@/components/home/hero'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'

import services from "@/static-files/services";
import { getHomeData } from '@/actions/home'

import { Car } from '@prisma/client';
import { Button } from '@/components/ui/button'



export const metadata = {
  title: "Buy & Sell Cars in Pakistan - Get Your Ride Now.",
  description: "Proudly providing unusual Car Needs in Pakistan. Buy & Sell Cars. List Your Car Now and let the Ghosts Work.",
};

export const revalidate = 100

const HomePage = async () => {
  const response = await  getHomeData()
  const { gpCars, featuredCars, recentCars } = response

  return (
    <div className='sapce-y-4'>
    {/* Hero Section */}
      <Hero/>
     
        
      {/* GP Cars */}
      <CarCarosel
      title="Ghost Yard's"
      see_more='inventory/search?adType=ghost-yard'
      cars={gpCars as Car[]}
      />

      {/* Services */}
      <div className="my-16">

      <h1 className="text-xl md:text-2xl font-semibold">Services</h1>
        <div className="m-2 grid grid-cols-2 gap-4">
          {
            services.map((item,index)=>(
              <Link href={item.link} key={index} className="bg-card  hover:bg-white/10 transition-all cursor-pointer 
                            flex justify-between p-4 rounded-xl  md:h-auto
                            flex-col items-end
                            md:flex-row relative">
                <div className="text-wrap order-2  w-full md:order-1">
                  <h3 className="text-primary text-xs hidden md:inline">{item.subTitle}</h3>
                  <h2 className="text-base md:text-lg self-start font-semibold">{item.title}</h2>
                  <p className=" text-sm hidden md:inline">{item.details}</p>
                </div>
                <Image className="w-3/5 h-auto mx-auto order-1 md:w-auto md:h-full md:order-2" width={80} height={80} src={`/media/services${item.image}`} alt={item.title}/>
                <div className='absolute bottom-2 right-2'>
                  <ArrowTopRightIcon className='w-4 h-4'/>
                </div>
              </Link>
            ))
          }
        </div>
      </div>
     
      <Suspense>
        <CarCarosel
        title='Featured Cars'
        see_more='inventory/search?adType=featured'
        cars={featuredCars as Car[]}
        />
      </Suspense>

      <Suspense>
        <CarCarosel
        title='Recent Cars'
        see_more='inventory/search?adType=free-listing'
        cars={recentCars as Car[]}
        />
      </Suspense>

      <div className='my-40 rounded-xl border-2 p-4 px-6 flex justify-between items-center'>
                <div>
                    <h4 className='text-xl font-semibold'>
                       Ghost Bot is finally <span className='text-primary'>LIVE</span>
                    </h4>
                    <p className='text-sm'>Get instant replies with our Bot</p>
                    <Link target='_blank' href={'https://wa.me/16232741046'}>
                        <Button className='my-4' variant={'outline'}>
                            Check Out <ArrowTopRightIcon/>
                        </Button>
                    </Link>
                </div>
                <Image src={'/media/services/bot.webp'} width={200} height={200} alt='Ghost Bot'/>
      </div>
    </div>
  )
}

export default HomePage





