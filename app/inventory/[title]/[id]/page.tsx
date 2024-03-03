import { Button } from '@/components/ui/button'
import formatAmount from '@/lib/foramt-price'
import {InfoCircledIcon} from '@radix-ui/react-icons'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import CopyToClipboard from '@/components/car-details/clipboard'

import React from 'react'
import formatTimeDifference from '@/lib/format-date'
import Gallery from '@/components/car-details/gallery'
import { Car, User } from '@prisma/client'
import { getCarDetails } from '@/actions/car-details'

// async function getData(id : string) {
//     const res = await fetch(`http://localhost:3000/api/inventory/car-details?id=${id}`,{cache: 'no-cache'})
   
//     if (!res.ok) {
//       throw new Error('Failed to fetch data')
//     }

//     return res.json()
//   }
export async function generateMetadata(
    { params, searchParams }:any
  ) {
  
    const {title, id} = params;
    let title2 = `${title.replace(/-/g, " ")} for Sale in Pakistan`
    let desc = `Buy ${title2} in best price only at Ghost Protocols. Find your Next Car or Post Your Car for FREE.`
    
    
   
    return {
      title: title2,
      description: desc
      
    }
  }
  

const CarDetailsPage = async ({ params }: { params: { title: string , id : string} }) => {
 
    const {car, seller} = await getCarDetails(params.id)


    return (
    <div className="main flex flex-wrap md:flex-nowrap gap-3 p-2">
        <div className="content w-full md:w-2/3 flex-grow flex flex-col">
            <h1 className="text-xl md:text-2xl font-semibold order-2 pt-2 md:order-1 md:pb-4">{`${car?.title}`}</h1>
            <div className="order-2 md:order-1 stat-value text-primary md:hidden"><span className="font-normal">Rs</span> {formatAmount(car!.price)}</div>

            <div className="gallery  relative overflow-hidden aspect-video
                       w-full rounded-xl bg-primary-light dark:bg-primary
                       order-1 md:order-2">
                <Gallery gallery= {car?.gallery} id={car?.id}/>

            </div>

            {/* Quick Overview */}
            <div className="bg-card order-3 px-4 xl:px-8 xl:my-5 py-5  rounded-xl my-4 flex justify-between">
                <div className="flex flex-col md:flex-row justify-between gap-3 items-center">
                <div className="order-2 md:order-1">
                    <div className=" text-xs md:text-base opacity-60">Year</div>
                    <div className="text-sm md:text-xl font-semibold">{car?.year}</div>
                </div>

                <svg  xmlns="http://www.w3.org/2000/svg" strokeWidth="1" fill="none" viewBox="0 0 24 24" className="order-1 md:order-2 inline-block w-8 h-8 stroke-current"><path d="M19,4H17V3a1,1,0,0,0-2,0V4H9V3A1,1,0,0,0,7,3V4H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm1,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V12H20Zm0-9H4V7A1,1,0,0,1,5,6H7V7A1,1,0,0,0,9,7V6h6V7a1,1,0,0,0,2,0V6h2a1,1,0,0,1,1,1Z"/></svg>     
                </div>

                <div className="border-x border-red-50 opacity-10"></div>

                <div className="flex flex-col md:flex-row justify-between gap-3 items-center">
                <div className="order-2 md:order-1">
                    <div className=" text-xs md:text-base opacity-60">Mileage</div>
                    <div className="text-sm md:text-xl font-semibold">{car!.mileage.toLocaleString()} km</div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="order-1 md:order-2 inline-block w-8 h-8 stroke-current"><path d="M6.34315 17.6569C5.22433 16.538 4.4624 15.1126 4.15372 13.5607C3.84504 12.0089 4.00346 10.4003 4.60896 8.93853C5.21446 7.47672 6.23984 6.22729 7.55544 5.34824C8.87103 4.46919 10.4177 4 12 4C13.5823 4 15.129 4.46919 16.4446 5.34824C17.7602 6.22729 18.7855 7.47672 19.391 8.93853C19.9965 10.4003 20.155 12.0089 19.8463 13.5607C19.5376 15.1126 18.7757 16.538 17.6569 17.6569"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 12L16 10"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>     
                </div>

                <div className="border-x border-red-50 opacity-10"></div>      

                <div className="flex flex-col md:flex-row justify-between gap-3 items-center">
                <div className="order-2 md:order-1">
                    <div className=" text-xs md:text-base opacity-60">Engine</div>
                    <div className="text-sm md:text-xl font-semibold">{car!.engine}</div>
                </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="order-1 md:order-2 inline-block w-8 h-8 stroke-current" >
                    <path d="M14 8V5M11 5H17M6 12H3M3 9V15M21 11V19M9 12H9.01M12 12H12.01M15 12H15.01M6 8V16H8L10 19H18V10L16 8H6Z"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>

                <div className="border-x border-red-50 opacity-10"></div>     


                <div className="flex flex-col md:flex-row justify-between gap-3 items-center">
                <div className="order-2 md:order-1">
                    <div className=" text-xs md:text-base opacity-60">Registraion</div>
                    <div className="text-sm md:text-xl font-semibold">{car!.registration}</div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="order-1 md:order-2 inline-block w-8 h-8 stroke-current"><path d="M22 9.96997H2"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 18.9199H11"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 3.91992H6C3.79086 3.91992 2 5.71078 2 7.91992V17.9199C2 20.1291 3.79086 21.9199 6 21.9199H18C20.2091 21.9199 22 20.1291 22 17.9199V7.91992C22 5.71078 20.2091 3.91992 18 3.91992Z"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>     
                </div>
            </div>
            {/* Quick Overview */}
        

            {/* Detailed Overview */}
            <div className="flex w-full order-4 px-2 py-5 my-4 md:my-16 flex-wrap md:flex-nowrap">

            <div className="flex-grow mx-3">
            <div className="detailed-ov">
                <h4 className="detailed-ov-key">Body</h4>
                <h4 className=" detailed-ov-value ">{car!.body}</h4>
            </div>
            <hr className="opacity-100 dark:opacity-15"/>
            
            <div className="detailed-ov">
                <h4 className="detailed-ov-key">Color</h4>
                <h4 className=" detailed-ov-value ">{car!.color}</h4>
            </div>
            <hr className="opacity-100 dark:opacity-15"/>

            <div className="detailed-ov">
                <h4 className="detailed-ov-key">Engnie Capacity</h4>
                <h4 className=" detailed-ov-value ">{car!.engineCapacity}</h4>
            </div>
            <hr className="opacity-100 dark:opacity-15"/>

            <div className="detailed-ov">
                <h4 className="detailed-ov-key">#Stock-ID</h4>
                <h4 className=" detailed-ov-value "><CopyToClipboard text={car!.id?.toString() as string} msg={"#Stock Id Copied to Clipboard"}/></h4>
            </div>
            <hr className="opacity-100 dark:opacity-15"/>

            </div>

            <div className="flex-grow mx-3">
            <div className="detailed-ov">
                <h4 className="detailed-ov-key">Drive</h4>
                <h4 className=" detailed-ov-value ">FWD</h4>
            </div>
            <hr className="opacity-100 dark:opacity-15"/>
            
            <div className="detailed-ov">
                <h4 className="detailed-ov-key">Car Location</h4>
                <h4 className=" detailed-ov-value ">{car!.location}</h4>
            </div>
            <hr className="opacity-100 dark:opacity-15"/>

            <div className="detailed-ov">
                <h4 className="detailed-ov-key">Transmission</h4>
                <h4 className=" detailed-ov-value ">{car!.transmission? "Automatic" : "Manual"}</h4>
            </div>
            <hr className="opacity-100 dark:opacity-15"/>

            <div className="detailed-ov">
                <h4 className="detailed-ov-key">Uploaded</h4>
                <h4 className=" detailed-ov-value ">{formatTimeDifference(car!.date as Date)}</h4>
            </div>
            <hr className="opacity-100 dark:opacity-15"/>

            </div>


            </div>
            {/* Detailed Overview */}

            <div className='order-5'>
                <h2 className='text-lg md:text-xl font-semibold' >Seller Comments</h2>
                <p className="p-4 bg-card rounded-xl" style={{ whiteSpace: 'pre-wrap' }}>{car!.sellerComments}</p>
            </div>
        
        </div>

        <div className="sidebar w-full md:w-1/4 flex-shrink-0 space-y-4">
            <div className="bg-card p-4 rounded-xl">
                <div className="space-y-2 py-2">
                    <p className="text-sm opacity-50">Demand</p>
                    <h2 className="Price text-xl md:text-2xl font-extrabold text-primary"> 
                        <span className="font-normal ">PKR </span>{formatAmount(car!.price)}
                    </h2>
                    {!car!.gpcar && (
                        <p className="text-xs py-1  text-center bg-primary rounded-xl">
                            GP MANAGED
                        </p>
                    )}
                    {!car!.featured && (
                        <p className="text-xs py-1 text-center bg-primary rounded-xl">
                            FEATURED
                        </p>
                    )}
                </div>
                <hr className='my-4 border-popover-foreground opacity-40'/>   
               
                <div className="space-y-2 py-2">
                    <p className="text-sm opacity-50">Ghost Inspection</p>
                    <div className="flex justify-between items-center">
                        <h2 className="Price text-xl md:text-2xl font-extrabold"> 
                        N/A
                        </h2>
                        
                        <InfoCircledIcon className='h-6 w-6'/>

                    </div>
                    <p className="text-xs opacity-50">No Records Found</p>
                   
                </div>
                <hr className='my-4 border-popover-foreground opacity-40'/>   
                
                <div className="space-y-2 py-2">
                    <Button className='w-full' variant={'outline'}>
                       Seller Phone
                    </Button>
                    <Button className='w-full'>
                        Buy it For Me
                    </Button>
                </div>
            </div>

            <div className="bg-card p-4 rounded-xl flex flex-col items-center space-y-1">
                <Avatar className='w-28 h-28 my-4'>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>GP</AvatarFallback>
                </Avatar>
                
                <h2 className='text-lg font-semibold'>{seller!.name}</h2>
                <h3 className='text-sm pb-3'>{formatTimeDifference(seller!.date_joined) }</h3>
                <Button className='w-full' variant={'outline'}>
                       View Profile
                </Button>
            </div>

            <div className="bg-card p-4 rounded-xl flex flex-col items-center space-y-1">
                <h4 className="font-semibold">Instructions</h4>
                <ul className="text-sm text-start  p-3 pl-4 list-decimal">
                    <li>Use our WhatsApp Chatbot by clicking chat button to get instant replies.</li>
                    <li>Meetings can be booked by Chatbot if our team isnt available on call.</li>
                    <li>Our prices are almost final, further negociations are done on location only.</li>
                    <li>GP is not responsible for B2B Deals in any way.</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default CarDetailsPage