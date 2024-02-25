import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import {CameraIcon} from '@radix-ui/react-icons'


import formatAmount from '@/lib/foramt-price'
import formatTimeDifference from '@/lib/format-date'
import { Skeleton } from "@/components/ui/skeleton"


const CarCard = async (params: CarCardProps) => {

  const {
    id,
    imgs,
    galleryIndex,
    title,
    price,
    year,
    registration,
    mileage,
    engine,
    time
        } = params ;
  
  const link = title.replace(/ /g, "-")
  const newImg = imgs[galleryIndex].replace("<ID>", id)
  
  
  return (
    <Link href={`/inventory/${link}/${id}`}>
      <div id='car-card' style={{ scrollSnapAlign: "end" }}
          className="bg-card cursor-pointer  
          max-w-64 rounded-xl overflow-hidden drop-shadow-lg
          h-52 md:h-64">
        <div className="w-full h-1/2  img  relative overflow-hidden">
            <Skeleton className="w-full h-full rounded-t-xl flex items-center justify-center">
              <CameraIcon className='w-8 h-8'/>
            </Skeleton>
            <Image className="w-full h-full object-cover  absolute top-0 right-0 rounded-t-xl bg-black" src={`/media/inventory/${newImg}.webp`} width={250} height={150} alt={title}/>
        </div>
    
        <div className="h-1/2 w-full px-2 py-2 flex flex-col justify-evenly">
          <h3 className="title text-sm truncate ">{title}</h3>
          <h2 className="Price text-base md:text-lg font-bold text-primary"> 
          <span className="font-normal ">PKR </span>{formatAmount(price)}</h2>
          <p className="city text-xs">{registration}</p>
          <h2 className="city text-xs md:text-sm font-bold">
            {year} <span className="font-normal"> | </span> {mileage.toLocaleString()} km  <span className="font-normal">|</span> {engine}
          </h2>
          <p className="city text-xs md:text-xs opacity-70">{formatTimeDifference(time)} </p>
        </div>
      </div>
    </Link>
  )
}

export default CarCard