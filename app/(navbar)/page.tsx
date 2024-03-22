
import CarCard from '@/components/common/carCard'
import React, { Suspense } from 'react'
import Image from 'next/image'

import services from "@/static-files/services";
import CarCarosel from '@/components/common/car-carousel'
import { getHomeData } from '@/actions/home'
import Hero from '@/components/home/hero'
import Link from 'next/link'
import { Car } from '@prisma/client';
import { ArrowRightIcon } from '@radix-ui/react-icons'
// import Combo from '@/components/home/combo';
import Navbar from '@/components/home/navbar';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
// import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import ErrorComponent from '@/components/common/error';



export const metadata = {
  title: "Buy & Sell Cars in Pakistan - Get Your Ride Now.",
  description: "Proudly providing unusual Car Needs in Pakistan. Buy & Sell Cars. List Your Car Now and let the Ghosts Work.",

};


async function getData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  try{
    const res = await fetch(`/api/home`,
  {
    method: 'POST', 
    headers: {
    'Content-Type': 'application/json'
    },
    cache: 'no-store'
     })
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  
  console.log("hello")
  return res.json()
        
   
} catch (error){
    console.error(error)
    return {}
}

  
}


const HomePage = async () => {
  const data = await  getHomeData()
  const { gpCars, featuredCars, recentCars } = data

  return (
    <div className='sapce-y-4'>
      <Hero/>
      {/* <Combo/> */}
        
      
      {/* <CarCarosel
      title="Ghost Yard's"
      see_more='inventory/search?adType=gp-car'
      cars={recentCars as Car[]}
      /> */}

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
                <Image className="w-3/5 h-auto mx-auto order-1 md:w-auto md:h-full md:order-2" width={200} height={200} src={`/media/services${item.image}`} alt={item.title}/>
                <div className='absolute bottom-2 right-2'>
                  <ArrowRightIcon className='w-4 h-4'/>
                </div>
              </Link>
            ))
          }
        </div>
      </div>
      <Suspense fallback={<><h1>hello</h1></>}>
        <CarCarosel
        title='Recent Cars'
        see_more='inventory/search?adType=gp-car'
        cars={recentCars as Car[]}
        />
      </Suspense>
      {/* <Suspense>
        <CarCarosel
        title='Featured Cars'
        see_more='inventory/search?adType=gp-car'
        cars={recentCars as Car[]}
        />
      </Suspense>
      <CarCarosel
      title='Recent Cars'
      see_more='inventory/search?adType=gp-car'
      cars={recentCars as Car[]}
      /> */}
      {/* {JSON.stringify(recentCars)} */}

  {/* <Navbar/> */}


    </div>
  )
}

export default HomePage





