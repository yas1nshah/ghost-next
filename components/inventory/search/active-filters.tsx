'use client'
import React from 'react';
import {useRouter, useSearchParams } from 'next/navigation';

const ActiveFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  let queries:any = []
  searchParams.forEach((value, key1)=>{
    queries.push({key:key1, value : value})
  })
//   const q = searchParams.getAll()


const removeParam = (paramToRemove: any) => {
    const newSearchParams = new URLSearchParams(searchParams);
    
    newSearchParams.delete(paramToRemove);
  
    router.replace(`/inventory/search?${newSearchParams.toString()}`);
  };
  

  return (
    <>
    {
        queries.map((filter:any, index:number)=>(
            <div className="px-2 py-1 bg-card  gap-3 rounded-xl flex" key={index}>
                <p className='text-sm md:text-base'>
                    <span className='text-xs font-light'>{`${filter.key}: `}</span>
                    {decodeURIComponent(filter.value)}
                </p>
                <button onClick={() => removeParam(filter.key)} className="px-2 max-h-6 bg-card hover:bg-primary rounded-full">x</button>
            </div>
        ))
    }
    
    {/* {
        searchParams.forEach((value,key)=>{
            console.log(value)
           return (
        <div className="p-2 bg-primary-light dark:bg-primary gap-3 rounded-xl flex" key={key}>
          <p>
            <span className='text-sm font-light'>{`${key}: `}</span>
            {value}
          </p>
          <button onClick={() => removeParam(key)} className="px-2 bg-primary-light dark:bg-primary hover:bg-base-100 rounded-full">x</button>
        </div>
        
        )})
    } */}
    
      {/* {Object.keys(searchParams).map((key) => (
        <div className="p-2 bg-primary-light dark:bg-primary gap-3 rounded-xl flex" key={key}>
          <p>
            <span className='text-sm font-light'>{`${key}: `}</span>
            {searchParams[key]}
          </p>
          <button onClick={() => removeParam(key)} className="px-2 bg-primary-light dark:bg-primary hover:bg-base-100 rounded-full">x</button>
        </div>
      ))} */}
    </>
  );
};

export default ActiveFilters;
