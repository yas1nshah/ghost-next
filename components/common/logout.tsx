
import React from 'react'
import { signOut } from '@/auth'
import { Button } from '../ui/button';

const Logout = () => {
  return (
    <form action={async ()=>{
      "use server"
      await signOut()
  }}>
      <Button type='submit' className='my-4 w-full hover:bg-destructive' variant={'outline'} size={'sm'} >Log out</Button>
  </form>

   
  )
}

export default Logout