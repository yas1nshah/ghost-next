import CarCard from '@/components/common/carCard'
import React from 'react'
import Image from 'next/image'

import services from "@/static-files/services";
import CarCarosel from '@/components/common/car-carousel'
import { getHomeData } from '@/actions/home'
import Hero from '@/components/home/hero'
import Link from 'next/link'

async function getData() {
  const res = await fetch('http://localhost:3000/api/home',{cache: 'no-cache'})
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  
  return res.json()
}

const HomePage = async () => {
  const data = await  getData()

  return (
    <div className='sapce-y-6'>
      <Hero/>
      <CarCarosel
      title="Ghost Yard's"
      see_more='inventory/search?adType=gp-car'
      cars={data.recentCars}
      />

      {/* Services */}
      <div className="my-16">

      <h1 className="text-xl md:text-2xl font-semibold">Services</h1>
        <div className="m-2 grid grid-cols-2 gap-4">
          {
            services.map((item,index)=>(
              <Link href={item.link} key={index} className="bg-card  hover:bg-primary hover:bg-opacity-0 transition-all cursor-pointer 
                            flex justify-between p-4 rounded-xl
                            flex-col items-end
                            md:flex-row">
                <div className="text-wrap order-2  w-full md:order-1">
                  <h3 className="text-primary text-xs hidden md:inline">{item.subTitle}</h3>
                  <h2 className="font-medium text-base md:text-lg self-start">{item.title}</h2>
                  <p className=" text-sm hidden md:inline">{item.details}</p>
                </div>
                <Image className="w-2/3 h-auto  order-1 md:w-auto md:h-full md:order-2" width={200} height={100} src={`/media/services${item.image}`} alt={item.title}/>
              </Link>
            ))
          }
        </div>
      </div>
      
      <CarCarosel
      title='Featured Cars'
      see_more='inventory/search?adType=gp-car'
      cars={data.recentCars}
      />
      <CarCarosel
      title='Recent Cars'
      see_more='inventory/search?adType=gp-car'
      cars={data.recentCars}
      />
       

      {/* <CarCard
        id='65d9ba2ab2a5b484e2dc16c7'
        title='Honda Civic Reborn Black Fabric 2004'
        year={2004}
        engine='Petrol'
        mileage='3255'
        imgs={["Honda-Civic-2004-<ID>-0"]}
        price={2144}
        registration='Lahore'
        time='2024-02-24T09:43:06.556+00:00'
        key={"0"}
      /> */}


    </div>
  )
}

export default HomePage