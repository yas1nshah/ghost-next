import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import * as z from "zod"

import { DemandListSchema } from "@/schemas"
import formatTimeDifference from '@/lib/format-date'
import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { demandMarkDone, getDemandList } from '@/actions/demand-list'
import DoneButton from '@/components/demand-list/done-btn'
import Link from 'next/link'
import Pagination from '@/components/demand-list/pagination'

export const metadata = {
  title: "Demand List - Get cash in hand deals for these cars",
  description: "Proudly providing unusual Car Needs in Pakistan. Buy & Sell Cars. List Your Car Now and let the Ghosts Work.",

};





const DemandListPage = async ({params, searchParams}:any) => {
 const {page = 1} = searchParams ;

 const demands:any = await getDemandList(page)
  const session = await auth();

  return (
    <div className='space-y-6'>
      <div className="m-2">
        <h1 className='text-2xl md:text-4xl font-semibold'>Demand List</h1>
        <div className="text-xs md:text-sm breadcrumbs ">
              <ul>
                <li><Link href={"/"}>Home</Link></li> 
                <li><Link href={`/demand-list`}>Demand List</Link></li> 
              </ul>
        </div>
        <hr className='opacity-30 border-base-content'/>
      </div>
        {
          (session?.user?.role === "TEAM" || session?.user?.role === "ADMIN") &&
          <Link href={"/admin/add-demand"}>
            <Button className='w-full' variant={"outline"}>
              Add Demand
            </Button>
          </Link>
        }
      <Table>
        <TableCaption>{"Today's demand List."}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-card-foreground">No.</TableHead>
            {
              (session?.user?.role === "TEAM" || session?.user?.role === "ADMIN") &&
              <TableHead className='text-card-foreground'>Done</TableHead>
            }
            <TableHead className='text-card-foreground'>Demand</TableHead>
            <TableHead className="text-right text-card-foreground">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            demands.map((demand: z.infer<typeof DemandListSchema>, index:number)=>(
              <TableRow key={index}>
                <TableCell className="font-medium">{index +1}</TableCell>
                {
                  (session?.user?.role === "TEAM" || session?.user?.role === "ADMIN") &&
                  <TableCell>
                    <DoneButton id={demand.id}/>
                    </TableCell>
                }
                <TableCell>{demand.demand}</TableCell>
                <TableCell className="text-right">{formatTimeDifference(demand.date as Date)}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>

      <div className="flex justify-end">
        <Pagination page={page}/>
      </div>

    </div>
  )
}

export default DemandListPage