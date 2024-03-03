import React from 'react'
import CarCard from './car-card';
import { getSearchCars } from '@/actions/search';

type CarResultProps = {
    keyword: string;
    yearFrom: number;
    yearTo: number;
    priceFrom: number;
    priceTo: number;
    color: string;
    transmission: string;
    bodyType: string;
    adType: string;
    make: string;
    model: string;
    page: string;
  };


  // async function getData(props : CarResultProps) {
  //   const { keyword, yearFrom, yearTo, priceFrom, priceTo, color, transmission, bodyType, adType,page ,make, model } = props;

  //   const searchParams = new URLSearchParams();
  
  //   if (keyword) searchParams.append('keyword', decodeURIComponent(keyword));
  //   if (yearFrom) searchParams.append('yearFrom', yearFrom.toString());
  //   if (yearTo) searchParams.append('yearTo', yearTo.toString());
  //   if (priceFrom) searchParams.append('priceFrom', priceFrom.toString());
  //   if (priceTo) searchParams.append('priceTo', priceTo.toString());
  //   if (color) searchParams.append('color', color);
  //   if (transmission) searchParams.append('transmission', transmission);
  //   if (bodyType) searchParams.append('bodyType', bodyType);
  //   if (adType) searchParams.append('adType', adType);
  //   if (page) searchParams.append('page', page);
  //   if (make) searchParams.append('make', make);
  //   if (model) searchParams.append('model', model);
    
    
  //   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  //   const dynamicSearchURL = `${baseUrl}/api/inventory/search?${searchParams.toString()}`;
  
  //   // console.log("yoyoyoyoo")
  //   // console.log(props?.toString())
  //   const res = await fetch(`${dynamicSearchURL}`,{ next: { revalidate: 5 } })
  
  //   if (!res.ok) {
  //     throw new Error('Failed to fetch data')
  //   }
    
  //   // console.log(res.json.toString())
  //   return res.json()
  // }

  async function getData(props: CarResultProps) {

        const { keyword, yearFrom, yearTo, priceFrom, priceTo, color, transmission, bodyType, adType, page, make, model } = props;

        const cars = await getSearchCars(
            keyword,
            'All', // Location (not provided in props)
            make,
            model,
            yearFrom ? yearFrom.toString() : undefined,
            yearTo ? yearTo.toString() : undefined,
            priceFrom? priceFrom.toString() : undefined,
            priceTo? priceTo.toString() : undefined,
            
            transmission || 'All',
            bodyType || 'All',
            adType || 'All',
            page ? page.toString() :"1"
        );

        return cars;
    // throw new Error('Failed to fetch data');
    
}

const CarResult = async (params : CarResultProps ) => {
    const cars  = await getData(params)
  return (
    <div className='space-y-2 md:space-y-4'>
      
        {cars.map((car) => (
            <CarCard car={car} key={car.id} /> // Ensure to add a unique key prop
        ))}
    </div>
  )
}

export default CarResult