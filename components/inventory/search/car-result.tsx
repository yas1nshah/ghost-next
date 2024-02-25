import React from 'react'

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


  async function getData(props : CarResultProps) {
    const { keyword, yearFrom, yearTo, priceFrom, priceTo, color, transmission, bodyType, adType,page ,make, model } = props;

    const searchParams = new URLSearchParams();
  
    if (keyword) searchParams.append('keyword', decodeURIComponent(keyword));
    if (yearFrom) searchParams.append('yearFrom', yearFrom.toString());
    if (yearTo) searchParams.append('yearTo', yearTo.toString());
    if (priceFrom) searchParams.append('priceFrom', priceFrom.toString());
    if (priceTo) searchParams.append('priceTo', priceTo.toString());
    if (color) searchParams.append('color', color);
    if (transmission) searchParams.append('transmission', transmission);
    if (bodyType) searchParams.append('bodyType', bodyType);
    if (adType) searchParams.append('adType', adType);
    if (page) searchParams.append('page', page);
    if (make) searchParams.append('make', make);
    if (model) searchParams.append('model', model);
  
    const dynamicSearchURL = `http://localhost:3000/api/inventory/search?${searchParams.toString()}`;
  
    // console.log("yoyoyoyoo")
    // console.log(props?.toString())
    const res = await fetch(`${dynamicSearchURL}`,{ next: { revalidate: 5 } })
  
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    
    // console.log(res.json.toString())
    return res.json()
  }

const CarResult = async (params : CarResultProps ) => {
    const cars = await getData(params)
  return (
    <div>{JSON.stringify(cars)}</div>
  )
}

export default CarResult