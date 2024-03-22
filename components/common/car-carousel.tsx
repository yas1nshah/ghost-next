
import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import CarCard from '@/components/common/carCard'
import formatAmount from '@/lib/foramt-price'
import { Car } from '@prisma/client'


type CarCarosel =  {
  title : string;
  see_more : string;
  cars : Car[];
}


const CarCaroselComp = (params:  CarCarosel) => {
  return (
    <div className='my-4'>
      
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl md:text-2xl py-4">{params.title}</h2>
        <Button className='' size={'sm'} variant={'outline'} >
          <Link className='text-sm' href={"/"}>See More</Link>
        </Button>
      </div>

    <Carousel
      opts={{
        align: "start",
        loop: true
      }}
      
     
      className="w-full relative mb-28"
    >
      <CarouselContent>
          {
            Array.from({length: params.cars.length}).map((_, index)=> (
              <CarouselItem key={index} className="md:basis-1/4 basis-1/2 ">
              <CarCard
              key={index}
              id={params.cars[index].id as string}
              galleryIndex={params.cars[index].galleryIndex}
              title={`${params.cars[index].make} ${params.cars[index].model} ${params.cars[index].year}`}
              year={params.cars[index].year}
              engine={params.cars[index].engine}
              mileage={`${params.cars[index].mileage.toLocaleString()}`}
              imgs={params.cars[index].gallery}
              price={params.cars[index].price}
              registration={params.cars[index].registration}
              time={params.cars[index].date }
              />
            </CarouselItem>
            ))
          }
            
      </CarouselContent>
   
      <div className="absolute flex h-10 mt-6 top-full right-0  mr-4 gap-4">
          <CarouselPrevious className='' />
          <CarouselNext  className=''/>
        
      </div>
    </Carousel>


    </div>
  )
}

export default CarCaroselComp