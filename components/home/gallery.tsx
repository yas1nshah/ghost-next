import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
 

const gallery = (props : any) => {
  const {gallery, id} = props;

  return (
    <Carousel className="h-full">
      <CarouselContent>
              {
                gallery.map((img:any, index:any)=> (
                  <CarouselItem key={index} className='bg-black h-40 md:h-80 grow'>

                    <Image className='w-full h-full object-cover' src={`${img}`} width={500} height={400} alt='Gallery Item'/>
                  </CarouselItem>
                  ))
              }
        
      
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

export default gallery

// {Array.from({ length: gallery.length }).map((_, index) => {
//   const newImg: string = gallery[index]
//  return (
// <CarouselItem className='h-full bg-white' key={index}>
//   <div className="bg-red-100">
//     <h1>fdsafgsjkbnlag</h1>
//   </div>
//   {/* <Image className='w-full h-full object-cover' src={`${newImg}`} width={500} height={500} alt='Gallery Item'/> */}
// </CarouselItem>
// )})}