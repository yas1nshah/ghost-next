"use server"
import React from 'react'
import EditCarForm from '@/components/inventory/edit-car/edit-car-form';
import { getCarDetails } from '@/actions/car-details';

// async function getData(id : string) {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
//   const res = await fetch(`${baseUrl}/api/inventory/car-details?id=${id}`,{cache: 'no-cache'})
 
//   if (!res.ok) {
//     throw new Error('Failed to fetch data')
//   }

//   return res.json()
// }

const EditCarPage = async ({params}:{params: {id:string}}) => {
  
  const car = await getCarDetails(params.id)
  console.log(car.car?.gallery)

  return (
    <main className='max-w-6xl min-h-svh'>
      
        <EditCarForm result ={car} />
    </main>
  )
}

export default EditCarPage