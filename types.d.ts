import { Car } from '@prisma/client';


interface AddCarSchema {
    title: string,
    id : string | undefined,

    date: string | undefined,
    galleryIndex : number,
    gallery: string[],

    make: string,
    model: string,
    year: number,
    price: number,

    location:  string,
    mileage:  number,
    transmission : boolean,

    engine:  string,
    engineCapacity:  string,
    registration:  string,
    body :  string,
    color:  string,

    gpCar : boolean | undefined,
    featuredCar : boolean | undefined,

    sellerID: string,
    seller: any,
    sellerComments :  string,
}

interface City {
    id: number;
    name: string;
  }
  

interface CarCardProps {
    id: string;
    imgs: string[]; 
    galleryIndex: number,
    title: string;
    price: number;
    year: number;
    registration: string; 
    mileage: string;
    engine: string; 
    time: string; 
  }

type CarCarosel =  {
    title : string;
    see_more : string;
    cars : Car[];
}

type CarResult =  {
  id: number;
  make: string;
  model: string;
  title: string;
  engineType: string;
  engineCapacity: string;
  bodyType: string;
}

