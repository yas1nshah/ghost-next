import ActiveFilters from '@/components/inventory/search/active-filters';
import CarResult from '@/components/inventory/search/car-result';
import Pagination from '@/components/inventory/search/search';
import SideBarContent from '@/components/inventory/search/sidebar-context';
import { Button } from '@/components/ui/button';
import React from 'react'

const InventorySearchPage = ({params, searchParams} : {params:any, searchParams: any}) => {
    const {make, model , keyword, yearFrom, yearTo, priceFrom, priceTo, color, transmission, bodyType, adType, page  } = searchParams;
  
    return (
    <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap">
        <section className="sidebar md:w-1/4 flex-grow md:flex-grow-0 flex-shrink-0 m-2">
        <SideBarContent
            keyword = {keyword} yearFrom = {yearFrom} yearTo={yearTo}
            priceFrom = {priceFrom} priceTo={priceTo} color={color}
            transmission={transmission} bodyType={bodyType} adType={adType}
            makeP={make} modelP={model} 
          />
        </section>
        
        <section className='content flex-grow md:w-3/4'>
            <p className='px-2 text-sm md:text-base'>Active Filters:</p>
            <div id='active-filters' className="filters flex gap-2 p-2 overflow-x-scroll">
                <ActiveFilters/> 
            </div>
                <CarResult
                keyword = {keyword} yearFrom = {yearFrom} yearTo={yearTo}
                priceFrom = {priceFrom} priceTo={priceTo} color={color}
                transmission={transmission} bodyType={bodyType} adType={adType} page={page} 
                make={make} model={model} 
                />
        <div className="flex justify-end my-4 gap-4">
          <Pagination page={page}/>
          
        </div>
        </section>
    </div>
  )
}

export default InventorySearchPage