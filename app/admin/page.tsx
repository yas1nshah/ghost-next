import React from 'react'
import Link from 'next/link'
import { ArrowTopRightIcon } from '@radix-ui/react-icons';


export const metadata = {
  title: "Admin Dashboard - GhostProtocols",
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


const AdminDashboard = () => {
  return (
    <div className="space-y-4">
      <div className="m-2">
        <h1 className='text-2xl md:text-4xl font-semibold'>Admin Dashboard</h1>
        <div className="text-xs md:text-sm breadcrumbs ">
              <ul>
                <li><Link href={"/"}>Home</Link></li> 
                <li><Link href={`/admin`}>Admin</Link></li> 
                
              </ul>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <Link href={'/admin/review-ads'} className="p-4 rounded-xl flex-grow bg-card">
          <h2 className='texl-sm md:text-xl font-bold'>Review Car Ads</h2>
          <p className='text-xs md:text-sm'>Manage new Cars Ads.</p>
          <div className="flex justify-end mt-2">
            <ArrowTopRightIcon/>
          </div>
        </Link>
        
        <div className="p-4 rounded-xl flex-grow bg-card">
          <h2 className='texl-sm md:text-xl font-bold'>Review Car Models</h2>
          <p className='text-xs md:text-sm'>Add new Cars to our Database.</p>
          <div className="flex justify-end mt-2">
            <ArrowTopRightIcon/>
          </div>
        </div>
        
        <Link href={'/admin/manage-cars'} className="p-4 rounded-xl flex-grow bg-card">
          <h2 className='texl-sm md:text-xl font-bold'>Manage Cars</h2>
          <p className='text-xs md:text-sm'>Manage Cars Posted on GhostProtocols.</p>
          <div className="flex justify-end mt-2">
            <ArrowTopRightIcon/>
          </div>
        </Link>

      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="p-4 rounded-xl flex-grow bg-card">
          <h2 className='texl-sm md:text-xl font-bold'>Review Cities</h2>
          <p className='text-xs md:text-sm'>Add new Cities to our Database.</p>
          <div className="flex justify-end mt-2">
            <ArrowTopRightIcon/>
          </div>
        </div>
        
        <Link href={'/admin/add-demand'} className="p-4 rounded-xl flex-grow bg-card">
          <h2 className='texl-sm md:text-xl font-bold'>Add Demand</h2>
          <p className='text-xs md:text-sm'>Create a new Demand.</p>
          <div className="flex justify-end mt-2">
            <ArrowTopRightIcon/>
          </div>
        </Link>
        
        <div className="p-4 rounded-xl flex-grow bg-card">
          <h2 className='texl-sm md:text-xl font-bold'>Manage Demands</h2>
          <p className='text-xs md:text-sm'>Manage Demands Posted on GhostProtocols.</p>
          <div className="flex justify-end mt-2">
            <ArrowTopRightIcon/>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminDashboard