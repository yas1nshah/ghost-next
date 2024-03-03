"use client"


import React, { useState } from 'react'
import { Button } from '../ui/button';
import { demandMarkDone } from '@/actions/demand-list';
import { toast } from 'sonner';

const DoneButton = ({id}:any) => {
const [done, setDone] = useState(false)
    
  return (
    <Button size={"xs"} variant={'outline'}
        onClick={()=>{
          demandMarkDone(id);
          setDone(true)
          toast("Marked as Done!")
        }}
    >
          {done? "Done" : "Mark Done"}
    </Button>
  )
}

export default DoneButton