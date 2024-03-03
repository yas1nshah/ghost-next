import Link from 'next/link'
import React from 'react'

const ServicesPage = () => {
  return (
    <div className='space-y-6'>
        <div className="m-2">
            <h1 className='text-2xl md:text-4xl font-semibold'>Services</h1>
            <div className="text-xs md:text-sm breadcrumbs ">
                <ul>
                    <li><Link href={"/"}>Home</Link></li> 
                    <li><Link href={`/demand-list`}>Services</Link></li> 
                </ul>
            </div>
            <hr className='opacity-30 border-base-content'/>
        </div>

        <div className="mx-2">
            <h2 className="text-2xl">
                We are working on bringing services to you guys...
            </h2>
            <h3 className="text-lg">
                {"we're on it... Kindly wait."}
            </h3>
        </div>
    </div>
  )
}

export default ServicesPage