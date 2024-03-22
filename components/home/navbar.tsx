'use client'
import React from 'react'
import { Button } from '../ui/button'
import {HomeIcon, DashboardIcon, FileTextIcon, PersonIcon, PlusIcon } from '@radix-ui/react-icons'
import { Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'



const Navbar = () => {
    const path = usePathname();
    
  return (
    
    <nav>
        <ul className='fixed  w-full left-0 bottom-0 bg-card backdrop-blur-lg flex justify-between p-1 list-none z-20 md:hidden '>
            
                <Link className='w-1/5' href={'/'}>
                    <div className='text-center'>
                        <Button variant={'ghost'} size={'sm'} className={`${(path === '/') && "bg-white/15"}`}>
                            <HomeIcon className='h-6 w-6'/>
                        </Button>
                        <p className={`${(path === '/') && "font-bold"} text-xs`}>Home</p>
                    </div>
                </Link>
            
            
                <Link className='w-1/5' href={'/services'}>
                    <div className='text-center'>
                        <Button variant={'ghost'} size={'sm'} className={`${(path === '/services') && "bg-white/15"}`}>
                            <DashboardIcon className='h-6 w-6'/>
                        </Button>
                        <p className={`${(path === '/services') && "font-bold"} text-xs`}>Services</p>
                    </div>
                </Link>
            
            
                <Link className='w-1/5' href={'/inventory/add-car'}>
                    <div className='text-center'>
                        <Button variant={'default'} size={'sm'} className={`${(path === '/inventory/add-car') && "bg-white/15"} rounded-xl -translate-y-3 scale-125`}>
                            <PlusIcon className='h-6 w-6'/>
                        </Button>
                        <p className={`${(path === '/inventory/add-car') && "font-bold"} text-xs`}>Add Car</p>
                    </div>
                </Link>
            
            
                <Link className='w-1/5' href={'/demand-list'}>
                    <div className='text-center'>
                        <Button variant={'ghost'} size={'sm'} className={`${(path === '/demand-list') && "bg-white/15"}`}>
                            <FileTextIcon className='h-6 w-6'/>
                        </Button>
                        <p className={`${(path === '/demand-list') && "font-bold"} text-xs`}>Demands</p>
                    </div>
                </Link>
            
            
                <Link className='w-1/5' href={'/account'}>
                    <div className='text-center'>
                        <Button variant={'ghost'} size={'sm'} className={`${(path === '/account') && "bg-white/15"}`}>
                            <PersonIcon className='h-6 w-6'/>
                        </Button>
                        <p className={`${(path === '/account') && "font-bold"} text-xs`}>More</p>
                    </div>
                </Link>
            
        </ul>
       
    </nav>
  )
}

export default Navbar