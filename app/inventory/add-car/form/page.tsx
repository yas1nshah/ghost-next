
import React from 'react'
import AddCarForm from '@/components/inventory/add-car/add-car-form'
import Link from 'next/link'

export const metadata = {
  title: "Add Car Form - Ghost Protocols",
  description: "Post an Ad for free and reach out to thousands of Ghostly Buyers with us.",

};

const AddCarPage = () => {
  return (
    <div>
       <div className="m-2">
        <h1 className='text-2xl md:text-4xl font-semibold'>Add Car Form</h1>
        <div className="text-xs md:text-sm breadcrumbs ">
              <ul>
                <li><Link href={"/"}>Home</Link></li> 
                <li><Link href={`/inventory`}>Inventory</Link></li> 
                <li><Link href={`/inventory/add-car`}>Add Car</Link></li> 
                <li>Form</li> 
              </ul>
        </div>
        <hr/>
      </div>
        <AddCarForm/>
    </div>
  )
}

export default AddCarPage