import CarCard from '@/components/common/carCard'
import React from 'react'
import Image from 'next/image'

import services from "@/static-files/services";
import CarCarosel from '@/components/common/car-carousel'
import { getHomeData } from '@/actions/home'
import Hero from '@/components/home/hero'
import Link from 'next/link'
import { Car } from '@prisma/client';

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
    <div className='sapce-y-6'>
      <Hero/>
      
        
      
      <CarCarosel
      title="Ghost Yard's"
      see_more='inventory/search?adType=gp-car'
      cars={recentCars as Car[]}
      />

      {/* Services */}
      <div className="my-16">

      <h1 className="text-xl md:text-2xl font-semibold">Services</h1>
        <div className="m-2 grid grid-cols-2 gap-4">
          {
            services.map((item,index)=>(
              <Link href={item.link} key={index} className="bg-card  hover:bg-white/10 transition-all cursor-pointer 
                            flex justify-between p-4 rounded-xl
                            flex-col items-end
                            md:flex-row">
                <div className="text-wrap order-2  w-full md:order-1">
                  <h3 className="text-primary text-xs hidden md:inline">{item.subTitle}</h3>
                  <h2 className="font-medium text-base md:text-lg self-start">{item.title}</h2>
                  <p className=" text-sm hidden md:inline">{item.details}</p>
                </div>
                <Image className="w-2/3 h-auto  order-1 md:w-auto md:h-full md:order-2" width={200} height={200} src={`/media/services${item.image}`} alt={item.title}/>
              </Link>
            ))
          }
        </div>
      </div>
      
      <CarCarosel
      title='Featured Cars'
      see_more='inventory/search?adType=gp-car'
      cars={recentCars as Car[]}
      />
      <CarCarosel
      title='Recent Cars'
      see_more='inventory/search?adType=gp-car'
      cars={recentCars as Car[]}
      />
       


    </div>
  )
}

export default HomePage