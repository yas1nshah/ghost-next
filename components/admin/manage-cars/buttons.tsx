'use client'
import React, { useState } from 'react'
import { CopyIcon, Share1Icon, HeartIcon, HeartFilledIcon, Pencil1Icon } from "@radix-ui/react-icons"
 
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { usePathname, useRouter } from 'next/navigation'
import { toast } from "sonner"
import { Check, Pencil, TrashIcon } from 'lucide-react'
import { deleteAd, makeAdLive } from '@/actions/review-ad'

const ActionButtons = (params:{id:string}) => {
    const [approved, setApproved] = useState(false)
    const path = usePathname()
    const router = useRouter()
    
  return (
    <div className={`${approved && "hidden"} flex gap-2 items-center`}>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" size={'icon'}><TrashIcon/></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                <DialogTitle>Delete Ad</DialogTitle>
                <DialogDescription className='text-card-foreground'>
                   Are you sure to make the Ad Live?
                </DialogDescription>
                </DialogHeader>
                
                <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                    <Button type="button" variant="outline">
                    Cancel
                    </Button>
                </DialogClose>
                <DialogClose asChild>
                    
                    <Button type="button" variant="destructive"
                    onClick={async ()=>{
                        const res =  await deleteAd(params.id);
                        if(res?.msg)
                        {
                            toast(res.msg)
                            setApproved(true)
                        }
                        else{
                         toast(res?.error)
                        }
                     }}
                     >
                    Delete
                    </Button>
                </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" size={'icon'}><Pencil/></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                <DialogTitle>Edit Ad</DialogTitle>
                <DialogDescription className='text-card-foreground'>
                   Are you sure to make the Ad Live?
                </DialogDescription>
                </DialogHeader>
                
                <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                <Button type="button" variant="outline">
                    Cancel
                    </Button>
                </DialogClose>
                <DialogClose asChild>
                    
                    <Button type="button" variant="default"
                    onClick={async ()=>{
                        router.push(`/inventory/edit-car/${params.id}`)
                     }}
                    >
                    Edit
                    </Button>
                </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default ActionButtons