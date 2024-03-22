'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { ArrowTopRightIcon, Cross1Icon } from '@radix-ui/react-icons'
import { Check } from 'lucide-react'
import formatTimeDifference from '@/lib/format-date'
import CarDetailPreview from './car-prev'
import { toast } from 'sonner'
import { printWord } from '@/actions/review-ad'
import ActionButtons from './buttons'

const CarCard = (params:{car:any, index:number}) => {
    const {car, index} =  params;
  return (
    <div className="p-4 bg-card rounded-xl flex justify-between gap-4 items-center" key={index}>
            <p>{index+1}</p>
            <div>
              <h2 className='text-sm md:text-lg font-semibold'>{car.title} {car.year}</h2>
              <p className='text-xs md:text-sm'>{formatTimeDifference(car.date)}</p>
            </div>
            <div className="flex-grow"></div>
            <div className='space-y-2 md:flex gap-6'>

            
            <>
                <ActionButtons id={car.id}/>
              {/* <Button  variant={'destructive'} size={'icon'}><Cross1Icon/></Button>
              
              <Button variant={'default'} size={'icon'}><Check/></Button> */}
            </>
            <Dialog>
                <DialogTrigger asChild>
                <Button variant={'outline'} > Preview <ArrowTopRightIcon/></Button>

                </DialogTrigger>
                <DialogContent className="max-w-6xl h-2/3 overflow-y-scroll">
                    <DialogHeader>
                        <DialogTitle>Ad Preview</DialogTitle>
                    </DialogHeader>
                    
                    
                    <CarDetailPreview car={car}/>
                </DialogContent>
            </Dialog>
            </div>
        </div>
    
  )
}

export default CarCard