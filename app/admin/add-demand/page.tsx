import React from 'react'
import Link from 'next/link'
import DemandListForm from '@/components/demand-list/demand-list-form'

const AddDemandPage = () => {
  return (
    <div className="space-y-6">
        <div className="m-2">
            <h1 className='text-2xl md:text-4xl font-semibold'>Add Demand</h1>
            <div className="text-xs md:text-sm breadcrumbs ">
                <ul>
                    <li><Link href={"/"}>Home</Link></li> 
                    <li><Link href={`/admin`}>Admin</Link></li> 
                    <li>Add New Demand</li> 
                </ul>
            </div>
            <hr className='opacity-30'/>
        </div>

        <DemandListForm/>
    </div>
  )
}

export default AddDemandPage