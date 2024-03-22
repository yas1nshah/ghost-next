'use client'
import { getFavoriteCars } from '@/actions/favourites'
import CarCard from '@/components/account/favorites-car-card'
import { Car } from '@prisma/client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const FavouritesPage = () => {
  const [favourites, setFavourites] = useState<string[]>()

  useEffect(()=>{
    const getFavs = () => {
      const favsRaw = localStorage.getItem("favourites");
      if (favsRaw){
        const favs = JSON.parse(favsRaw)
        setFavourites(favs)

      }
    }


    getFavs()
  
  },[])
  return (
    <div>
        <div className="m-2">
            <h1 className='text-2xl md:text-4xl font-semibold'>Favorites</h1>
            <div className="text-xs md:text-sm breadcrumbs ">
                <ul>
                    <li><Link href={"/"}>Home</Link></li> 
                    <li><Link href={`/account`}>Account</Link></li> 
                    <li>Favourites</li> 
                    
                </ul>
            </div>
            <hr className='opacity-30'/>
        </div>

        <div>
          
          <div className='space-y-4 md:space-y-6 my-6'>
      
      {favourites ? favourites.map((car, index) => (
          <CarCard car={car} key={index} /> // Ensure to add a unique key prop
      )): "No cars Added"}
  </div>
          {/* {cars.length > 0 ?
        
            cars.map((c, index)=>(
              <CarCard key={index} car={c}/>
            )) 
            :
            <h2 className='text-center text-lg'>No Ads Found</h2>
          } */}
        </div>

      
    </div>
  )
}

export default FavouritesPage