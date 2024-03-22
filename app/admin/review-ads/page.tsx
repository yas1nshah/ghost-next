import React from 'react'
import Link from 'next/link'
import { getRecentAds } from '@/actions/review-ad'
import { Button } from '@/components/ui/button';
import { ArrowTopRightIcon, ArrowUpIcon, Cross1Icon } from '@radix-ui/react-icons';
import { Check } from 'lucide-react';
import formatTimeDifference from '@/lib/format-date';
import CarCard from '@/components/admin/review-ads/car-card';
import ReviewAdsPagination from '@/components/admin/review-ads/pagination';


export const metadata = {
  title: "Review New Ads - GhostProtocols",
  description: "Proudly providing unusual Car Needs in Pakistan. Buy & Sell Cars. List Your Car Now and let the Ghosts Work.",
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};


const ReviewCarPage = async ({params, searchParams}:any) => {
  const {page = 1} = searchParams ;
  const recentAds:any = await getRecentAds(page)
  return (
    <div className="space-y-6">
      <div className="m-2">
          <h1 className='text-2xl md:text-4xl font-semibold'>Review New Ads</h1>
          <div className="text-xs md:text-sm breadcrumbs ">
              <ul>
                  <li><Link href={"/"}>Home</Link></li> 
                  <li><Link href={`/admin`}>Admin</Link></li> 
                  <li>Review New Ads</li> 
              </ul>
          </div>
          <hr className='opacity-30'/>
      </div>

      {/* {
        JSON.stringify(recentAds)
      } */}
      <div className="space-y-2">

      
      {
        recentAds.map((car:any, index:number)=>
          (
            <>
            <CarCard car={car} index={index} key={index}/>
          
          
            </>
          )
        )
      }
      <div className="flex justify-end">
        <ReviewAdsPagination page={page}/>
      </div>
      </div>
    </div>
  )
}

export default ReviewCarPage