"use client"

import { search } from '@/actions/fetch-models'
import Link from 'next/link'
import React, { useEffect, useState, useTransition } from 'react'
import * as z from "zod"
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import { useRouter } from 'next/navigation'

import formatAmount from '@/lib/foramt-price'
import { postCar, saveDocumentInteraction } from '@/actions/post-car'
import { Button } from '@/components/ui/button'
import { CarSchema } from '@/schemas'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import { Readable } from 'stream';



interface FileBlob extends Readable {
  name: string;
}

const AddCarForm = () => {
  const [isPending, startTransition] =  useTransition()
  const router = useRouter()

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
    
  const [gallery, setGallery] = useState<Blob[]>([]);

  const [newCar, setNewCar] = useState<Car>({
    id: "",
    title: "",
    galleryIndex: 0,
    gallery: [],
    date : undefined,
    
    featuredCar: false,
    gpCar: false,

    make: "",
    model: "",
    year: 0,
    price: 0,
  
    location: "",
    mileage: 0,
    transmission: false,
  
    engine: "",
    engineCapacity: "",
    registration: "",
    body: "",
    color: "",
  
    sellerID: "",
    seller: null, // Assuming any type can be null
    sellerComments: "",
})

  // ? Models
  const [showModels, setShowModels] = useState(false)
  const [modelData, setModelData] = useState<CarResult[]>([ 
    {
      "id": 352,
      "make": "Honda",
      "model": "Civic Reborn VTi Oriel 1.8 i-VTEC",
      "title": "Honda Civic Reborn VTi Oriel 1.8 i-VTEC",
      "engineType": "Petrol",
      "engineCapacity": "1800 cc",
      "bodyType": "Sedan"
    },
    {
    "id": 332,
    "make": "Honda",
    "model": "Civic",
    "title": "Honda Civic",
    "engineType": "Petrol",
    "engineCapacity": "1500 cc",
    "bodyType": "Sedan"
  },
  {
    "id": 1322,
    "make": "Toyota",
    "model": "Corolla",
    "title": "Toyota Corolla",
    "engineType": "Petrol",
    "engineCapacity": "1600 cc",
    "bodyType": "Sedan"
  },
  {
    "id": 1375,
    "make": "Toyota",
    "model": "Corolla GLi 1.3",
    "title": "Toyota Corolla GLi 1.3",
    "engineType": "Petrol",
    "engineCapacity": "1300 cc",
    "bodyType": "Sedan"
  },
  {
    "id": 1054,
    "make": "Suzuki",
    "model": "Alto",
    "title": "Suzuki Alto",
    "engineType": "Petrol",
    "engineCapacity": "660 cc",
    "bodyType": "Hatchback"
  },
  {
    "id": 1752,
    "make": "Toyota",
    "model": "Yaris",
    "title": "Toyota Yaris",
    "engineType": "Petrol",
    "engineCapacity": "1000 cc",
    "bodyType": "Sedan"
  },
   ])

  const getModels = async (value:string) => {
    
    let searchResult: CarResult[];

        // Check local storage for models
        const cachedModels = localStorage.getItem('models');
        if (cachedModels) {
            const parsedModels: CarResult[] = JSON.parse(cachedModels);
            searchResult = parsedModels.filter(model =>
                model.make.toLowerCase().includes(value.toLowerCase())
            );
            setModelData(searchResult);
        } else {
            // If models not found in local storage, fetch from server
            searchResult = await search(value);
            setModelData(searchResult);
        }
  }

  // ? Registration
  const [showReg, setShowReg] = useState(false)
  const [regData, setRegData] = useState([{"id": 103, "name": "Lahore"}, {"id": 162, "name": "Rawalpindi"}, {"id": 85, "name": "Karachi"}, {"id": 130, "name": "Multan"}, {"id": 71, "name": "Islamabad"}, {"id": 50, "name": "Faisalabad"}, {"id": 1111, "name": "Punjab"},{"id": 1112, "name": "Sindh"},{"id": 1113, "name": "KPK"},])
  
  const getRegistrations = async (keyword: string) => {
      try {
        let searchResult;
    
        // Check local storage for cities
        const cachedCities = localStorage.getItem('cities');
        if (cachedCities) {
          const parsedCities = JSON.parse(cachedCities);
          // Filter cities based on the keyword
          searchResult = parsedCities.filter((city: City) =>
            city.name.toLowerCase().includes(keyword.toLowerCase())
          );
          setRegData(searchResult);
        } else {
          // If cities not found in local storage, fetch from server
          const response = await fetch('/cities.json'); // Adjust the path as needed
          const citiesData = await response.json();
          // Store cities in local storage
          localStorage.setItem('cities', JSON.stringify(citiesData));
          // Filter cities based on the keyword
          searchResult = citiesData.filter((city : City)=>
            city.name.toLowerCase().includes(keyword.toLowerCase())
          );
          setRegData(searchResult);
        }
    
        
      } catch (error) {
        console.error('Error fetching cities:', error);
        setCityData([]);
      }
  }

  // ? Location
  const [showCity, setShowCity] = useState(false)
  const [cityData, setCityData] = useState([{"id": 103, "name": "Lahore"}, {"id": 162, "name": "Rawalpindi"}, {"id": 85, "name": "Karachi"}, {"id": 130, "name": "Multan"}, {"id": 71, "name": "Islamabad"}, {"id": 50, "name": "Faisalabad"},])
  
  const getCities = async (keyword: string) => {
      try {
        let searchResult;
    
        // Check local storage for cities
        const cachedCities = localStorage.getItem('cities');
        if (cachedCities) {
          const parsedCities = JSON.parse(cachedCities);
          // Filter cities based on the keyword
          searchResult = parsedCities.filter((city: City) =>
            city.name.toLowerCase().includes(keyword.toLowerCase())
          );
          setCityData(searchResult);
        } else {
          // If cities not found in local storage, fetch from server
          const response = await fetch('/cities.json'); // Adjust the path as needed
          const citiesData = await response.json();
          // Store cities in local storage
          localStorage.setItem('cities', JSON.stringify(citiesData));
          // Filter cities based on the keyword
          searchResult = citiesData.filter((city : City)=>
            city.name.toLowerCase().includes(keyword.toLowerCase())
          );
          setCityData(searchResult);
        }
    
        
      } catch (error) {
        console.error('Error fetching cities:', error);
        setCityData([]);
      }
  }

  // ? Gallery
  const handleFileChange = async (e : React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    // Restrict file types to images (you can customize this further)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/heif', 'image/heic', 'image/bmp', 'image/webp'];
    if(files)
    {

      const selectedFiles = Array.from(files).filter(file =>
        allowedTypes.includes(file.type)
        );
    

    // Ensure that the total number of selected files is not more than 5
    if (selectedFiles.length + gallery.length > 5) {
        alert('You can only select up to 5 images.');
        return;
    }

    // Define a function to compress and convert an image to WebP format
    const compressAndConvertToWebP = (imageFile: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function (event) {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = function () {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx?.drawImage(img, 0, 0);
                    canvas.toBlob(blob => {
                        // Returning the blob directly
                        resolve(blob);
                    }, 'image/webp', 0.7); // Convert to WebP format with quality 0.7 (adjust as needed)
                };
            };
            reader.readAsDataURL(imageFile);
        });
    };

    // Compress and convert each selected image to WebP format
    const compressedImages = await Promise.all(selectedFiles.map(async (file) => {
        return await compressAndConvertToWebP(file);
    }));
  

    // Update the gallery state with the compressed images
    setGallery((prevGallery: Blob[]) => [...prevGallery, ...compressedImages] as Blob[]);
    // const newGallery: string[] = gallery.map((_, index) => `${newCar.make}-${newCar.model}-${newCar.year}-<ID>-${index}`);
    // setNewCar({...newCar, gallery: newGallery})

  }
  };

  useEffect(() => {
    const newGallery: string[] = gallery.map((_, index) => `${newCar.make}-${newCar.model}-${newCar.year}-<ID>-${index}`);
    setNewCar({...newCar, gallery: newGallery});
  }, [gallery, newCar.make, newCar.model, newCar.year]); // Include dependencies
  

  const removeImage = (index: number) => {
        
    setGallery((prevGallery) => {
      const newGallery = [...prevGallery];
      newGallery.splice(index, 1);
      return newGallery;
    });

    if (gallery.length === 0)
    {
      setNewCar({...newCar, galleryIndex: 0})
    }
    else if(index >newCar.galleryIndex)
    {
      setNewCar({...newCar, galleryIndex: newCar.galleryIndex})
      
    }
    else if(gallery.length > 1)
    {
      setNewCar({...newCar, galleryIndex: index-1})
    }
    else{
      setNewCar({...newCar, galleryIndex: 0})
    }
  }


  const uploadImages = async (id:string) => {
    // if(newCar.id === "")
    // {
    //   setError("ID not defined")
    //   return;
    // }
  
    for (let index = 0; index < gallery.length; index++) {
      const image = gallery[index];
      const makeModelYear = `${newCar.make}-${newCar.model}-${newCar.year}`; // Assuming make and model are available
      const imageName = `${makeModelYear}-${id}-${index}.webp`;
      const data = new FormData();
      data.append('img', new File([image], imageName, { type: image.type }));
      saveDocumentInteraction(data)
      .then((data)=>{
        setError(data.error as string + index);
        setSuccess(data.success as string + index);
      });
      
      router.replace("/")
    
    }
      
  };

  const onSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    setError("");
    setSuccess("");


    startTransition(async () => {
        postCar(newCar)
            .then(async (data) => {
          
              setError(data.error);
              setSuccess(data.success);
              setNewCar({...newCar, id: data.newId})
              if(data.newId)
              await uploadImages(data.newId);
            }) 
    });

    
    
}


  return (
    <div className='space-y-6'>
        {/* Select Gallery */}
        {newCar.galleryIndex}
        <div className="relative">
          {
            gallery.length > 0 && (
            
            <div className='flex gap-2'>

                {gallery.map((file, index) => (
                    <div key={index} className={`relative m-4 rounded-xl ${index === newCar.galleryIndex && "border-2"} border-secondary`}
                    onClick={()=>setNewCar({...newCar, galleryIndex: index})}>
                        <img
                            className='w-20 h-20 object-cover rounded-xl'
                            src={URL.createObjectURL(file)}
                            alt={`Image ${index + 1}`}
                        />
                        <i className="bg-base hover:bg-secondary absolute top-1 right-1 px-2 rounded-xl" onClick={()=>removeImage(index)}>x</i>
                     </div>
                    ))}
                
            </div>
          )}
          <Input type='file' multiple={true} onChange={handleFileChange}/>
        </div>
        {
          JSON.stringify(newCar.gallery)
        }
        <form className='space-y-6' onSubmit={onSubmit}>
        {/* Select Location */}
        <div className='relative'>
          <span className='label-text-alt'>Location</span>
          <Input
            type='text'
            placeholder='Choose Your Location'
            className=''
            onChange={(e) => {
              if(newCar)
              newCar.location  = e.target.value ;
              // setTitle(e.target.value);
              getCities(e.target.value);
            }}
            onFocus={() => setShowCity(true)}
            onBlur={() => setShowCity(false)}
            value={newCar?.location}
          />

          {
            showCity &&
            <div  className="p-4 my-2 absolute top-full left-0 z-20 bg-white dark:bg-black drop-shadow-xl w-full overflow-hidden overflow-y-scroll h-full md:h-64 rounded-xl">
              {
                cityData.length > 0 ?
                  cityData.map((city, index) => (
                    <div key={index} className='p-2'
                      onMouseDown={() => {
                        if(newCar)
                        {
                          newCar.location = city.name;
                        }
                        setShowCity(false);
                      }}
                    >
                   
                      <h4 className="text-base md:text-lg font-semibold">
                        {city.name}
                      </h4>
                      <hr className='dark:opacity-35 opacity-100' />
                    </div>
                  )) :
                  <p className="text-center">No Cars Found <span className='text-secondary'><Link href={'/'}>Report</Link></span></p>
              }
            </div>
          }
        </div>

        {/* Select Model */}
        <div className='relative'>
          <span className='label-text-alt'>Model</span>
          <Input
            type='text'
            placeholder='Choose Your Model'
            className=''
            onChange={(e) => {
              setNewCar({...newCar, title:e.target.value })
              // setTitle(e.target.value);
              getModels(e.target.value);
            }}
            onFocus={() => setShowModels(true)}
            onBlur={() => setShowModels(false)}
            value={newCar?.title}
          />

          {
            showModels &&
            <div  className="p-4 my-2 absolute top-full left-0 z-20 bg-white dark:bg-black drop-shadow-xl w-full overflow-hidden overflow-y-scroll h-full md:h-64 rounded-xl">
              {
                modelData.length > 0 ?
                  modelData.map((model, index) => (
                    <div key={index} className='p-2'
                      onMouseDown={() => {
                        setNewCar({...newCar,
                          make : model.make,
                          model : model.model,
                          engine : model.engineType,
                          engineCapacity : model.engineCapacity,
                          body : model.bodyType,
                          title : model.title })
                        
                        console.log("hello")
                        console.log(newCar)
                        // setMake(model.make);
                        // setModel(model.model);
                        // setEngine(model.engineType);
                        // setEngineCapacity(model.engineCapacity);
                        // setBody(model.bodyType);
                        // setTitle(model.title); // Update title here
                        // setCheck(prevCheck => ({ ...prevCheck, model: true }));
                        setShowModels(false);
                      }}
                    >
                      <h5 className="text-xs md:text-sm">
                        {model.make}
                      </h5>
                      <h4 className="text-base md:text-lg font-semibold">
                        {model.model}
                      </h4>
                      <hr className='dark:opacity-35 opacity-100' />
                    </div>
                  )) :
                  <p className="text-center">No Cars Found <span className='text-secondary'><Link href={'/'}>Report</Link></span></p>
              }
            </div>
          }
        </div>

        {/* Year and Price */}
        <div className="flex justify-between flex-col md:flex-row gap-4 w-full">
            {/* Select Year */}
            <div className='relative w-full'>
              <span className='label-text-alt'>Year</span>
              <Input
                type='number'
                placeholder='Enter Year'
                value={newCar.year }
                onChange={(e)=>{
                  setNewCar({...newCar, year: parseInt(e.target.value)})
                }}
              />

            </div>

            {/* Select Price */}
            <div className='relative w-full'>
              <span className='label-text-alt'>Price</span>
              <Input
                type='number'
                placeholder='Enter Price'
                value={newCar.price }
                onChange={(e)=>{
                  setNewCar({...newCar, price: parseInt(e.target.value)})
                }}

              />
            
              <p className='label-text-alt mb-4 mt-2 text-end'>{formatAmount(newCar.price) } </p>

            </div>
        </div>

        {/* Select Registration */}
        <div className='relative'>
          <span className='label-text-alt'>Registration</span>
          <Input
            type='text'
            placeholder='Choose Your Registration'
            className=''
            onChange={(e) => {
              setNewCar({...newCar, registration:e.target.value})
              
              // setTitle(e.target.value);
              getRegistrations(e.target.value);
            }}
            onFocus={() => setShowReg(true)}
            onBlur={() => setShowReg(false)}
            value={newCar.registration}
          />

          {
            showReg &&
            <div  className="p-4 my-2 absolute top-full left-0 z-20 bg-white dark:bg-black drop-shadow-xl w-full overflow-hidden overflow-y-scroll h-full md:h-64 rounded-xl">
              {
                regData.length > 0 ?
                  regData.map((city, index) => (
                    <div key={index} className='p-2'
                      onMouseDown={() => {
                        setNewCar({...newCar, registration: city.name})
                        setShowReg(false);
                      }}
                    >
                   
                      <h4 className="text-base md:text-lg font-semibold">
                        {city.name}
                      </h4>
                      <hr className='dark:opacity-35 opacity-100' />
                    </div>
                  )) :
                  <p className="text-center">No Cars Found <span className='text-secondary'><Link href={'/'}>Report</Link></span></p>
              }
            </div>
          }
        </div>

        {/* Color and Mileage */}
        <div className="flex justify-between flex-col md:flex-row gap-4 w-full">
            {/* Select Color */}
            <div className='relative w-full'>
              <span className='label-text-alt'>Color</span>
              <Select defaultValue='Black' onValueChange={(e)=>setNewCar({...newCar,color: e})}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Black">Black</SelectItem>
                  <SelectItem value="White">White</SelectItem>
                  <SelectItem value="Red">Red</SelectItem>
                </SelectContent>
              </Select>


            </div>

            {/* Select Mileage */}
            <div className='relative w-full'>
              <span className='label-text-alt'>Mileage</span>
              <Input
                type='number'
                placeholder='Enter Mileage'
                value={newCar.mileage }
                onChange={(e)=>{
                  setNewCar({...newCar, mileage: parseInt(e.target.value)})
                }}
              />
              <p className='label-text-alt mb-4 mt-2 text-end'>{newCar.mileage.toLocaleString() } km </p>

            </div>
        </div>

        {/* Select Color */}
        <div className='relative w-full'>
              <span className='label-text-alt'>Seller Comments</span>
              <Textarea onChange={(e)=>setNewCar({...newCar, sellerComments : e.target.value})} placeholder="Type your message here." />
        </div>
        
        <FormError message={error}/>
        <FormSuccess message={success}/>

        <Button
        type='submit'
        >
          Post Car
        </Button>
        </form>

    </div>
  )
}

export default AddCarForm