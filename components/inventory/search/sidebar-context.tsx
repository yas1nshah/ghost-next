"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"



import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type SideBarContentProps = {
    keyword: string;
    yearFrom: number;
    yearTo: number;
    priceFrom: number;
    priceTo: number;
    color: string;
    transmission: string;
    bodyType: string;
    adType: string;
    makeP: string;
    modelP: string;
  };

const SideBarContent = (params : SideBarContentProps)=> {
    
    const router = useRouter()
    const {keyword, yearFrom, yearTo, priceFrom, priceTo, color, transmission, bodyType, adType, page, makeP, modelP  } = params;
    const [keywordS, setKeywordS] = useState(keyword)
    const [yearFromS, setYearFromS] = useState(yearFrom)
    const [yearToS, setYearToS] = useState(yearTo)
    const [priceFromS, setPriceFromS] = useState(priceFrom)
    const [priceToS, setPriceToS] = useState(priceTo)
    const [colorS, setColorS] = useState(color)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    const [transmissionS, setTransmissionS] = useState(transmission)
    const [bodyTypeS, setBodyTypeS] = useState(bodyType)
    const [adTypeS, setAdTypeS] = useState(adType)
    const [makeS, setMakeS] = useState(makeP)
    const [modelS, setModelS] = useState(modelP)


    const handleSubmit = (e:any) => {
        e.preventDefault();
      
        // Build the dynamic search URL
        const searchParams = new URLSearchParams();
      
        if (keywordS) searchParams.append('keyword', encodeURIComponent(keywordS));
        if (yearFromS) searchParams.append('yearFrom', yearFromS.toString() as string);
        if (yearToS) searchParams.append('yearTo', yearToS.toString() as string);
        if (priceFromS) searchParams.append('priceFrom', priceFromS.toString() as string);
        if (priceToS) searchParams.append('priceTo', priceToS.toString() as string);
        if (colorS) searchParams.append('color', colorS);
        if (transmissionS) searchParams.append('transmission', transmissionS);
        if (bodyTypeS) searchParams.append('bodyType', bodyTypeS);
        if (adTypeS) searchParams.append('adType', adTypeS);
        if (makeS) searchParams.append('make', encodeURIComponent(makeS));
        if (modelS) searchParams.append('model', encodeURIComponent(modelS));
        if (page) searchParams.append('page', page);
      
        const dynamicSearchURL = `/inventory/search?${searchParams.toString()}`;
      
        // Navigate to the dynamically generated search page URL
        router.replace(dynamicSearchURL);
      };
  
    return (
    <div className='w-full'>
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger >Filters</AccordionTrigger>
                <AccordionContent>
                <form onSubmit={handleSubmit}>
                    <Accordion type="multiple" >

                        <AccordionItem value="keyword">
                            <AccordionTrigger>Keyword</AccordionTrigger>
                            <AccordionContent>
                                <Input type='text'
                                 placeholder='Search here'
                                 className='my-2'
                                 onChange={(e) => setKeywordS(e.target.value)}
                                 value={keywordS}
                                 />
                                <Button type='submit'>Go</Button>
                            </AccordionContent>
                         </AccordionItem>

                        <AccordionItem value="year">
                            <AccordionTrigger>Year</AccordionTrigger>
                            <AccordionContent>
                                
                                <Input 
                                type="number"
                                min={1950}
                                max={2024}
                                placeholder="From"
                                className='my-2'
                                onChange={(e) => setYearFromS(parseInt(e.target.value))}
                                value={yearFromS}
                                 />
                                <Input 
                                type="number"
                                min={1950}
                                max={2024}
                                placeholder="to"
                                className='my-2'
                                onChange={(e) => setYearToS(parseInt(e.target.value))}
                                value={yearToS}
                                 />
                                <Button type='submit'>Go</Button>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="price">
                            <AccordionTrigger>Price</AccordionTrigger>
                            <AccordionContent>
                                <p className='text-xs opacity-75'>Enter price in Lacs</p>
                                <Input 
                                type="number"
                                min={1}
                                max={2000}
                                placeholder="From"
                                className='my-2'
                                onChange={(e) => setPriceFromS(parseInt(e.target.value) * 100000)}
                                value={priceFromS/100000}
                                 />
                                <Input 
                                type="number"
                                min={2}
                                max={2000}
                                placeholder="to"
                                className='my-2'
                                onChange={(e) => setPriceToS(parseInt(e.target.value) * 100000)}
                                value={priceToS/100000}
                                 />
                                <Button type='submit'>Go</Button>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="color">
                            <AccordionTrigger>Color</AccordionTrigger>
                            <AccordionContent>
                                <Select  defaultValue={color} onValueChange={(e)=>setColorS(e)}>
                                    <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Theme" />
                                    </SelectTrigger>
                                    <SelectContent >
                                    <SelectItem value="Black">Black</SelectItem>
                                    <SelectItem value="White">White</SelectItem>
                                    <SelectItem value="Red">Red</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button className='mt-2' type='submit'>Go</Button>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="body">
                            <AccordionTrigger>Body</AccordionTrigger>
                            <AccordionContent>
                                <Select  defaultValue={bodyType} onValueChange={(e)=>setBodyTypeS(e)}>
                                    <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Body Type" />
                                    </SelectTrigger>
                                    <SelectContent >
                                    <SelectItem value="Black">SUV</SelectItem>
                                    <SelectItem value="White">White</SelectItem>
                                    <SelectItem value="Red">Red</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button className='mt-2' type='submit'>Go</Button>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="transmission">
                            <AccordionTrigger>Transmission</AccordionTrigger>
                            <AccordionContent>
                                <Select  defaultValue={transmission} onValueChange={(e)=>setTransmissionS(e)}>
                                    <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Transmission" />
                                    </SelectTrigger>
                                    <SelectContent >
                                    <SelectItem value="Auto">Auto</SelectItem>
                                    <SelectItem value="Manual">Manual</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button className='mt-2' type='submit'>Go</Button>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="adType">
                            <AccordionTrigger>Ad Type</AccordionTrigger>
                            <AccordionContent>
                                <Select  defaultValue={adType} onValueChange={(e)=>setAdTypeS(e)}>
                                    <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Ad Type" />
                                    </SelectTrigger>
                                    <SelectContent >
                                    <SelectItem value="Free">Free Listing</SelectItem>
                                    <SelectItem value="Ghost-Yard">Ghost Yards</SelectItem>
                                    <SelectItem value="Featured">Featured</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button className='mt-2' type='submit'>Go</Button>
                            </AccordionContent>
                        </AccordionItem>

                        
                    </Accordion>
                </form>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

    </div>
  )
}

export default SideBarContent