'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '../ui/button'
import Autoplay from 'embla-carousel-autoplay'
  
   

const Gallery = (props : any) => {
    const [active, setActive] = useState(false)
    const {gallery, id} = props;

    

  return (
    <>
    {
      active && 
      <div  className='fixed z-10 top-0 left-0 w-full h-full  bg-black/75'>
        <Carousel className="w-full h-ful"
         >
          <CarouselContent  onClick={()=>setActive((prev)=>!prev)}>
            {Array.from({ length: gallery.length }).map((_, index) => {
                const newImg: string = gallery[index].replace("<ID>", id)

              return (
              <CarouselItem className='min-h-lvh w-auto flex justify-center items-center' key={index}>
                  <Image onClick={()=>{}} className='object-contain' src={`/media/inventory/${newImg}.webp`} width={800} height={800} alt='Gallery Item'/>
                <div >
                </div>
              </CarouselItem>
            )})}
          </CarouselContent>
          <div className="p-2 md:p-5 absolute left-4 top-1/2  -translate-y-10">
            <CarouselPrevious className="relative"/>
          </div>

          <div className="px-2 md:px-5 absolute right-4 top-1/2 -translate-y-10">
            <CarouselNext className="relative"/>
          </div>
        </Carousel>
        <Button variant={'outline'} onClick={()=>setActive(false)} className='absolute top-2 right-2'>X</Button>
      </div>
    }


      <Carousel  className="w-full h-full bg-black"
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}>
        <CarouselContent>
          {Array.from({ length: gallery.length }).map((_, index) => {
              const newImg: string = gallery[index].replace("<ID>", id)

            return (
            <CarouselItem key={index} onClick={()=>setActive((prev)=>!prev)}>
              <Image className='w-full' src={`/media/inventory/${newImg}.webp`} width={500} height={500} alt='Gallery Item'/>
            </CarouselItem>
          )})}
        </CarouselContent>
        <div className=" p-2 md:p-5 absolute left-0 top-1/2  -translate-y-1/4">
          <CarouselPrevious className="relative"/>
        </div>

        <div className=" p-2 md:p-5 absolute right-0 top-1/2  -translate-y-1/4">
          <CarouselNext className="relative"/>
        </div>
      </Carousel>
    </>
  )
}

export default Gallery