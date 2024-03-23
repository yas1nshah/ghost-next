"use client"
import React, { useState } from 'react'
import { ModeToggle } from '../theme-switcher'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import Input from 'postcss/lib/input'
import Link from 'next/link'
import menu from '@/static-files/menu'
import Image from 'next/image'
import SearchBar from '@/components/home/search-bar'

const Header = () => {

  return (
    <div id='header'>
      <div className="flex justify-between item-center h-14 py-2 max-w-6xl mx-auto px-2">
    
        <div className="">
          <Link href={"/"}>
            <Image  className='h-full w-auto invert dark:invert-0' src={"/ghost.png"} width={100} height={100} alt='Ghost Protocols Logo'/>
          </Link>
        </div>

        <div className="flex gap-4">
          <SearchBar/>
          <div className='hidden md:inline'>
            <ModeToggle/>
          </div>
          <Link className=' ' href={"/account"}>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>GP</AvatarFallback>
            </Avatar>
          </Link>

        </div>
         
        
      </div>

      <nav className='hidden md:block px-2 bg-primary '>
        <ul className='flex justify-center gap-6 max-w-6xl mx-auto'>
          {menu.map((item, index) => (
            <li key={index} className='text-base font-semibold text-background hover:text-primary-foreground transition ease-in'>
              <Link href={item.link}>{item.name}</Link>
            </li>
          ))} 
        </ul>
      </nav>

    </div>
  )
}

export default Header

// const Header = () => {
//   const [searchBar, setSearchBar] = useState(false);

//   return (
//     <div id='header'>
//       <div className="flex justify-between item-center h-14 py-2 max-w-6xl mx-auto">
//         {
//           !searchBar ?
//           (
//             <>
//             <div className="mx-4">
//           <Link href={"/"}>
//             <Image  className='h-full w-auto invert dark:invert-0' src={"/ghost.png"} width={100} height={100} alt='Ghost Protocols Logo'/>
//           </Link>
//         </div>

//         <div className="flex gap-4">
//           <div onClick={()=>setSearchBar(true)} className="rounded-xl bg-card flex items-center"><i className="icon m-2 invert dark:invert-0" style={{backgroundPosition: "-30px -90px"}}/></div>
          
//           <div className='hidden md:inline'>
//             <ModeToggle/>
//           </div>
//           <Link className='hidden md:inline' href={"/account"}>
//             <Avatar>
//               <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
//               <AvatarFallback>CN</AvatarFallback>
//             </Avatar>
//           </Link>

//           <Sheet>
//             <SheetTrigger><div className="md:hidden rounded-xl bg-card flex items-center"><i className="icon m-2 invert dark:invert-0" style={{backgroundPosition: "-60px -90px"}}/></div> </SheetTrigger>
//             <SheetContent >
//               <SheetHeader>
//                 <SheetTitle>Menu</SheetTitle>
//                 <SheetDescription >
//                   <div className='h-full flex justify-between flex-col'>                  
//                     <ul className='space-y-2'>
//                       {menu.map((item, index) => (
//                         <li key={index} className='text-xl font-semibold text-card-foreground transition ease-in'>
//                           <Link href={item.link}>{item.name}</Link>
//                         </li>
//                       ))} 
//                     </ul>
                    

//                     <div className="absolute bottom-2 right-2 flex justify-end gap-4">
//                       <ModeToggle/>
//                       <Link href={"/account"}>
//                           <Avatar>
//                             <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
//                             <AvatarFallback>CN</AvatarFallback>
//                           </Avatar>
//                       </Link>
//                     </div>
//                   </div>
//                 </SheetDescription>
//               </SheetHeader>
//             </SheetContent>
//           </Sheet>
//         </div>
//         </> )
//            :
           
//             <div className='w-full flex gap-4'>
//               <div onClick={()=>setSearchBar(false)} className="rounded-xl bg-card flex items-center ml-4"><i className="icon m-2 invert dark:invert-0" style={{backgroundPosition: "-60px -30px"}}/></div>
//               <SearchBar/>
             
//             </div>     
            
//         }
        
//       </div>

//       <nav className='hidden md:block px-2 bg-primary '>
//         <ul className='flex justify-center gap-6 max-w-6xl mx-auto'>
//           {menu.map((item, index) => (
//             <li key={index} className='text-base font-semibold text-background hover:text-primary-foreground transition ease-in'>
//               <Link href={item.link}>{item.name}</Link>
//             </li>
//           ))} 
//         </ul>
//       </nav>

//     </div>
//   )
// }

// export default Header
