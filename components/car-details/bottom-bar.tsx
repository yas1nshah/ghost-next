'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import formatTimeDifference from '@/lib/format-date'
import Link from 'next/link';

const BottomBar = (params:{id:string, title:string, seller:any}) => {
    const [shouldSlideIn, setShouldSlideIn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
          if (scrollPercentage >= 20) {
            setShouldSlideIn(true);
          } else {
            setShouldSlideIn(false);
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        // Cleanup the event listener on component unmount
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    return (
    <div className={`fixed z-20 w-full left-0 bottom-0 bg-card backdrop-blur-lg md:py-4 ${shouldSlideIn ? 'slide-in active' : 'slide-in'}`}>
                <div className="max-w-6xl mx-auto flex justify-between p-2 ">

                <div className='space-y-1 md:space-y-4'>
                    <h2 className='text-lg font-semibold'>{params.title}</h2>
                    <div className="flex gap-2">
                        <Link target='_blank' href={`
                        https://wa.me/92${params.seller.phone}?text=Hello%2C%20I%20am%20interedted%20in%20your%20Ad%20for%20${params.title}.%20https://ghostprotocols.pk/inventory/-/${params.id}
                        
                        `}>
                            <Button size={'lg'} className='w-full text-xs md:text-sm' variant={'outline'}>
                                Phone
                            </Button>
                        </Link>
                        <Link target='_blank' href={`https://wa.me/16232741046?text=p/BTFM%20${params.title}.%20https://ghostprotocols.pk/inventory/-/${params.id}`}>
                            <Button size={'lg'} variant={'outline'} className='w-full bg-primary text-xs md:text-sm'>
                                Buy it For Me
                            </Button>
                        </Link>
                    </div>
                </div>
                <hr />
                <div className='flex justify-end flex-col md:flex-row gap-4 items-center'>
                    <Avatar className='w-10 h-10 md:h-20 md:w-20'>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>GP</AvatarFallback>
                    </Avatar>
                     <div>
                        <h2 className='text-xs md:text-lg font-semibold'>{params.seller!.name}</h2>
                        <h3 className='md:inline hidden text-xs pb-3'>{formatTimeDifference(params.seller!.date_joined) }</h3>
                        <Button className='w-full md:inline hidden' variant={'outline'}>
                            View Profile
                        </Button>
                    </div>   
                </div>
                </div>
                </div>
  )
}

export default BottomBar