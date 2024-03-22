'use client'
import React from 'react'
import {useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const ManageCarsPagination = (props:any) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const {page = 1} = props

    const goToPage = (page:any) => {
        const newSearchParams = new URLSearchParams(searchParams);
        
        newSearchParams.delete("page");
        newSearchParams.append("page", page)
      
        router.push(`/admin/review-ads?${newSearchParams.toString()}`);
        
      };
  return (
    <div className="flex gap-4">
        <Button variant={'outline'} onClick={() => goToPage(Number(page) - 1)} disabled={page ==1} >«</Button>
        <Button variant={'outline'} >{`Page ${page}`}</Button>
        <Button variant={'outline'} onClick={() => goToPage(Number(page) + 1)} >»</Button>
    </div>
  )
}

export default ManageCarsPagination