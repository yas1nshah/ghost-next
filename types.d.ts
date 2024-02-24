

interface Car {
    title: string,
    id : string | undefined,
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

    sellerID: string,
    seller: any,
    sellerComments :  string,
}

interface City {
    id: number;
    name: string;
  }
  
