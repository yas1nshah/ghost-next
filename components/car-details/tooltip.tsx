'use client'
import React from 'react'
import { CopyIcon, Share1Icon, HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons"
 
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
import { usePathname } from 'next/navigation'
import { toast } from "sonner"

const ToolTip = (params: {car:any}) => {
    const path = usePathname()
    const copyToClipboard = () => {
        const input = document.getElementById('link') as HTMLInputElement;
        input.select();
        document.execCommand('copy');
      };
  return (
    <div className='flex gap-2 justify-end'>
        <Button variant="outline" size={'icon'}
        onClick={()=>{
          const favsRaw = localStorage.getItem("favourites");
const favs = favsRaw ? JSON.parse(favsRaw) : [];

const index = favs.findIndex((item:any) => item && item.id === params.car.id);

if (index !== -1) {
    // If the item already exists in favorites, remove it
    favs.splice(index, 1);
    localStorage.setItem("favourites", JSON.stringify(favs));
    toast("Removed from favourites");
} else {
    // If the item doesn't exist in favorites, add it
    favs.push(params.car);
    localStorage.setItem("favourites", JSON.stringify(favs));
    toast("Added to favourites");
}

          

        }}
        >
        
            <HeartFilledIcon/>
        </Button>
        <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={'icon'}><Share1Icon/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
          <label htmlFor="link" className="sr-only">
            Link
            </label>
            <input
            id="link"
            defaultValue={`https://ghostprotocols.pk${path}`}
            readOnly
            />
        </div>
        
          <Button onClick={copyToClipboard} type="submit" variant={'outline'} size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default ToolTip