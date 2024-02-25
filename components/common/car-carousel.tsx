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



const CarCarosel = (params: CarCarosel) => {
  return (
    <div className='my-4'>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl md:text-2xl py-4">{"Ghost Yard's"}</h2>
        <Button className='' size={'sm'} variant={'outline'} >
          <Link className='text-sm' href={"/"}>See More</Link>
        </Button>
      </div>

    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full relative mb-28"
    >
      <CarouselContent>
          
            {params.cars.map((car, index)=>(
            <CarouselItem key={0} className="md:basis-1/4 basis-1/2 ">
              <CarCard
              key={index}
              id={car.id as string}
              galleryIndex={car.galleryIndex}
              title={`${car.make} ${car.model} ${car.year}`}
              year={car.year}
              engine={car.engine}
              mileage={`${car.mileage.toLocaleString()}`}
              imgs={car.gallery}
              price={car.price}
              registration={car.registration}
              time={car.date as string}
              />
            </CarouselItem>
            ))}
      </CarouselContent>

      <div className="absolute mt-10 bg-black top-full right-0 mr-16">
        <CarouselPrevious className='' />
        <CarouselNext  className=''/>
      </div>
    </Carousel>


    </div>
  )
}

export default CarCarosel