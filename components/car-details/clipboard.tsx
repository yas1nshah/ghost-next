"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { ClipboardCopy } from 'lucide-react'
import { toast } from "sonner"

const CopyToClipboard = ({text,msg}: {text:string, msg:string}) => {
  return (
    <Button variant={'outline'}
      onClick={()=>{
        //copy text to clipboard
        navigator.clipboard.writeText(text)
        toast(msg)
      }}
    >
      <ClipboardCopy className='w-4 h-4 mr-2'/> Copy
    </Button>
  )
}

export default CopyToClipboard