"use server"
import React from 'react'
import EditCarForm from '@/components/inventory/edit-car/edit-car-form';
import { getCarDetails } from '@/actions/car-details';
import Link from 'next/link';
import { auth } from '@/auth';
import { redirect } from "next/navigation";
import { toast } from 'sonner';



const EditCarPage = async ({params}:{params: {id:string}}) => {
  const session = await auth()
  const car = await getCarDetails(params.id)
  if(session?.user?.id !== car.seller?.id){
    redirect("/")
    toast("Its not Your Car!😑")
  }
  

  return (
    <div>
        <div className="m-2">
          <h1 className='text-2xl md:text-4xl font-semibold'>Edit Car Form</h1>
          <div className="text-xs md:text-sm breadcrumbs ">
                <ul>
                  <li><Link href={"/"}>Home</Link></li> 
                  <li><Link href={`/inventory`}>Inventory</Link></li> 
                  <li>Edit Car</li> 
                  <li>Form</li> 
                </ul>
          </div>
          <hr/>
        </div>
        
        <EditCarForm result ={car} />
    </div>
  )
}

export default EditCarPage