import React from 'react'
import Image from 'next/image'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
   

const Gallery = (props : any) => {
    const {gallery, id} = props;

  return (
    <Carousel className="w-full h-full bg-black">
      <CarouselContent>
        {Array.from({ length: gallery.length }).map((_, index) => {
            const newImg: string = gallery[index].replace("<ID>", id)

           return (
          <CarouselItem key={index}>
            <Image className='w-full' src={`/media/inventory/${newImg}.webp`} width={500} height={500} alt='Gallery Item'/>
          </CarouselItem>
        )})}
      </CarouselContent>
      <div className="bg-red p-5 absolute right-3/4 top-1/2 -translate-x-6 -translate-y-3">
        <CarouselPrevious className="relative"/>
      </div>

      <div className="bg-red p-5 absolute left-3/4 top-1/2 translate-x-6 -translate-y-3">
        <CarouselNext className="relative"/>
      </div>
    </Carousel>
  )
}

export default Gallery