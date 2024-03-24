import { Button } from '@/components/ui/button';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react'
import Image from 'next/image';


export const metadata = {
    title: "Post an Ad - Ghost Protocols",
    description: "Post an Ad for free and reach out to thousands of Ghostly Buyers with us.",
  
  };


const AddCarPage = () => {
  return (
    <div>
        <div className="m-2">
        <h1 className='text-2xl md:text-4xl font-semibold'>Add Car</h1>
        <div className="text-xs md:text-sm breadcrumbs ">
              <ul>
                <li><Link href={"/"}>Home</Link></li> 
                <li><Link href={`/add-car`}>Add Car</Link></li> 
                
              </ul>
        </div>
        <hr className='opacity-30 border-base-content'/>
        </div>

        <div className="my-6">
            <div className='my-4 rounded-xl border-2 p-4 px-6 flex justify-between items-center'>
                <div>
                    <h4 className='text-xl font-semibold'>
                       Let the GP Team <span className='text-primary'>SELL</span>
                    </h4>
                    <p className='text-sm'>Hastle Free Dealings. We handle everything</p>
                    <Link target='_blank' href={'https://wa.me/16232741046'}>
                        <Button className='my-4' variant={'outline'}>
                            Sell Now <ArrowTopRightIcon/>
                        </Button>
                    </Link>
                </div>
                <Image src={'/media/services/sell-now.webp'} width={200} height={200} alt='Ghost Bot'/>
            </div>

            <div className='my-4 rounded-xl border-2 p-4 px-6 flex justify-between items-center'>
                <div>
                    <h4 className='text-xl font-semibold'>
                       Sell by GP <span className='text-primary'>WEB</span>
                    </h4>
                    <p className='text-sm'>Post an Ad for Free and reach thousands of Buyers</p>
                    <Link href={'/inventory/add-car/form'}>
                        <Button className='my-4' variant={'outline'}>
                            Sell Now <ArrowTopRightIcon/>
                        </Button>
                    </Link>
                </div>
                <Image src={'/media/services/my-ads.webp'} width={200} height={200} alt='Ghost Bot'/>
            </div>
        </div>
    </div>
  )
}

export default AddCarPage