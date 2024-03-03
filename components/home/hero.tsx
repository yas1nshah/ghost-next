"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import categories from '@/static-files/categories';
import Gallery from "@/components/home/gallery";
import Link from 'next/link';
import Script from 'next/script';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"


function Hero() {
    const images = [
        "/media/covers/cover1.webp",
        "/media/covers/cover2.webp",
    ];

    const [menu, setMenu] = useState<number | null>(); // Provide a default value of null for the menu state
    useEffect(() => {
        function isDesktop() {
            // Check if the device width is greater than a certain threshold (you can adjust this as needed)
            return window.innerWidth > 768;
        }

        if (isDesktop()) {
            // Find the button with id "filter" and trigger a click event
            var filterButton = document.getElementById("categories");
            if (filterButton) {
                filterButton.click();
            }
        }
    }, []);

    return (
        <div id='hero' className={`my-2`}>
           
            <div id='hero-container' className='flex flex-wrap md:flex-nowrap gap-2 md:h-96 overflow-hidden'>
            <Accordion type="single" collapsible className='w-full order-2 md:order-1 md:w-1/4 md:mr-2'>
                <AccordionItem value="categories">
                    <AccordionTrigger id='categories'>Browse By</AccordionTrigger>
                    <AccordionContent>
                    <div className="collapse-content ">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    if (menu && index === menu - 1) {
                                        setMenu(null);
                                    } else {
                                        setMenu(index + 1);
                                    }
                                }}
                                className={`cursor-pointer h-10 flex justify-between items-center px-2 hover:bg-card rounded-xl ${menu && menu - 1 === index && 'bg-card'}`}
                            >
                                <h3 className=''>{category.name}</h3>
                                <p>{"->"}</p>
                            </div>
                        ))}
                    </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
                

                <div id='hero-gallery' className="relative w-full md:w-3/4 rounded-xl h-96 bg-card my-4 overflow-y-scroll transition-all order-1 max-h-40 md:order-2 md:max-h-80">
                    <div className='grid grid-cols-3 md:grid-cols-4'>
                        {menu &&
                            categories[menu - 1].subcategories.map((subCat, index1) => (
                                <div
                                    key={index1}
                                    className="bg-card hover:bg-gradient-to-br hover:to-transparent hover:from-primary flex flex-col justify-center items-center py-3 rounded-lg m-2"
                                >
                                    {subCat.image && <Image src={"/next.svg"} width={100} height={100}  alt='GP cover'/>}
                                    <Link href={subCat.link}>{subCat.name}</Link>
                                </div>
                            ))}
                    </div>
                    {!menu && <Gallery gallery={images} />}
                </div>
            </div>

            <div className="bg-card py-2 px-4 m-2 md:flex justify-between rounded-xl hidden">
                <p>Premium Picks</p>
                <p>💀</p>
                <p>Spectral Savings</p>
                <p>🔥</p>
                <p>Ethereal Rides</p>
                <p>🔥</p>
                <p>Phantom Deals</p>
                <p>💀</p>
                <p>Ghostly Grace</p>
            </div>
        </div>
    );
}

export default Hero;
