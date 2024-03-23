import React from 'react'
import Link from 'next/link'
import { auth } from '@/auth';
import { GetMyAds } from '@/actions/search';
import CarCard from '@/components/account/edit-car-card';
import Pagination from '@/components/account/pagination';


const MyAdsPage = async ({params, searchParams}: any) => {
    const {page = 1} = searchParams;
    const session = await auth();
   
    const cars = await GetMyAds(session!.user!.id as string, page)
    // const cars = await getData(page, userId);
  return (
    <div>
        <div className="m-2">
            <h1 className='text-2xl md:text-4xl font-semibold'>My Ads</h1>
            <div className="text-xs md:text-sm breadcrumbs ">
                <ul>
                    <li><Link href={"/"}>Home</Link></li> 
                    <li><Link href={`/account`}>Account</Link></li> 
                    <li>My Ads</li> 
                    
                </ul>
            </div>
            <hr/>
        </div>

        <div>
          {cars.length > 0 ?
         
             cars.map((c, index)=>(
              <CarCard key={index} car={c}/>
            )) 
            :
            <h2 className='text-center text-lg'>No Ads Found</h2>
          }
        </div>

        <div className="flex justify-end my-4">
          <Pagination page={page}/>
        </div>
    </div>
  )
}

export default MyAdsPage