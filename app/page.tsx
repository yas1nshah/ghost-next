import CarCard from '@/components/common/carCard'
import React from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import CarCarosel from '@/components/common/car-carousel'
import { getHomeData } from '@/actions/home'

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
    <div>
      <CarCarosel
      title='GP Cars'
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