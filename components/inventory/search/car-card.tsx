import React from 'react'

import Link from 'next/link'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import formatTimeDifference from '@/lib/format-date';
import formatAmount from '@/lib/foramt-price';

const CarCard = (params : any) => {
    
    const {car}   = params;
    const link = car.title.replace(/ /g, "-")
    const newImg = car.gallery[car.galleryIndex].replace("<ID>", car.id)

    return (
       
        <Link key={car.id} href={`/inventory/${link}/${car.id}`}  className={`bg-card ${car.featured && "border border-primary"}  h-28 mx-0 md:h-40 md:px-2 w-full flex rounded-xl dark:text-white text-nowrap `}>
          
        <div className='w-2/6 p-2 md:w-1/4 md:px-2 md:py-3 h-full flex-shrink-0 flex-grow-0'>
          <Image draggable="false" className="w-full h-full object-cover  rounded-xl" src={`https://media.ghostprotocls.pk/media/inventory/${newImg}.webp`} width={250} height={150} alt={car.title}/>
        </div>
  
        <div className="flex-grow md:flex overflow-hidden">
         
          <div className=' md:w-2/4 flex-shrink-0 px-4 pt-2 md:p-4 flex-grow overflow-hidden'>
            <div className="h-full flex flex-col justify-between">
                
                  <h3 className="truncate text-wrap text-sm md:text-base">
                    {car.title}
                  </h3>
                  
                  <p className="city text-xs md:text-sm">{car.registration}</p>
  
                  <h2 className="city text-sm md:text-base font-bold">
                    {car.year} <span className="font-normal"> | </span> {car.mileage.toLocaleString()} km  <span className="font-normal">|</span> {car.engine}
                  </h2>
                  <p className="city text-xs md:text-sm opacity-70">{formatTimeDifference(car.date) } Ago</p>
  
            </div>  
            {/* <Image className="w-full h-full object-cover  rounded-xl" src={"https://images.tixy.pk/images/Toyota_Camry_G_LIMITED_EDITION_2016-16-1.jpg"} width={250} height={150}/> */}
          </div>

          <div className='w md:-1/4 flex-shrink-0 flex-grow-0 flex flex-col justify-between px-4 md:p-2'>
              <div>
  
                    <h2 className="Price text-base md:text-xl font-bold text-primary"> 
                        <span className="pre font-normal ">PKR </span>
                        {formatAmount( car.price)} 
                    </h2>
                    {
                      car.featured &&
                      <div className="hidden md:block text-xs px-1 md:py-0.5 bg-primary my-1 rounded-full text-center ">GP Featured</div>
                    }
                    {
                      car.gpcar &&
                      <div className="hidden md:block text-xs px-1 md:py-0.5 bg-primary my-1 rounded-full text-center ">GP Personal</div>
                    }
                    {
                      !car.gpcar && !car.featured &&
                      <div className="hidden md:block text-xs px-1 md:py-0.5 bg-primary my-1 rounded-full text-center ">Free Listing</div>
                    }
                </div>
                <div className=""></div>
                <Button variant={'outline'} className="hidden md:block ">Seller Phone</Button>
  
            {/* <Image className="w-full h-full object-cover  rounded-xl" src={"https://images.tixy.pk/images/Toyota_Camry_G_LIMITED_EDITION_2016-16-1.jpg"} width={250} height={150}/> */}
          </div>
        </div>
            
        </Link>
      
  )
}

export default CarCard