"use client"

import { search } from '@/actions/fetch-models'
import React, { useEffect, useState, useTransition } from 'react'
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
import { postCar, saveDocumentInteraction, updateCar } from '@/actions/post-car'
import { Button } from '@/components/ui/button'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import { Readable } from 'stream';

import { CarResult, City } from '@/types'
import { CarFinal } from '@/schemas'
import SelectModel from './model'
import SelectCity from './city'
import SelectRegistration from './registration'


interface FileBlob extends Readable {
  name: string;
}

const EditCarForm = ({result}: any) => {
  const {car, seller}: {car: any, seller:any} = result;
  const [isPending, startTransition] =  useTransition()
  const router = useRouter()

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
    
  const [gallery, setGallery] = useState<Blob[]>([]);
  const [galleryChange, setgalleryChange] = useState(false)

  const [newCar, setNewCar] = useState<CarFinal>({
    id: car.id || null,
    title: car.title || '',
    galleryIndex: car.galleryIndex || 0,
    gallery: car.gallery,

    make: car.make || '',
    model: car.model || '',
    year: car.year || 0,
    price: car.price || 0,

    location: car.location || '',
    mileage: car.mileage || 0,
    transmission: car.transmission || false,

    engine: car.engine || '',
    engineCapacity: car.engineCapacity || '',
    registration: car.registration || '',
    body: car.body || '',
    color: car.color || '',

    sellerID: car.sellerID || '',
    sellerComments: car.sellerComments || '',
});

  

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
    if(galleryChange)
    {

      const newGallery: string[] = gallery.map((_, index) => `${newCar.make}-${newCar.model}-${newCar.year}-<ID>-${index}`);
      setNewCar({...newCar, gallery: newGallery});
    }
    else{
      setNewCar({...newCar, gallery: car.gallery})
    }
  }, [gallery, newCar.make, newCar.model, newCar.year, galleryChange]); // Include dependencies
  

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
      console.log("IMAGE")
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
      console.log("POSTED")
      
      
    }
      
  };

  async function saveImages(gallery:any, newCar:any, id:any) {
    for (let index = 0; index < gallery.length; index++) {
        console.log("IMAGE");
        const image = gallery[index];
        const makeModelYear = `${newCar.make}-${newCar.model}-${newCar.year}`; // Assuming make and model are available
        const imageName = `${makeModelYear}-${id}-${index}.webp`;
        const data = new FormData();
        data.append('img', new File([image], imageName, { type: image.type }));

        try {
            const result = await saveDocumentInteraction(data);
            setError(result.error ? result.error + index : '');
            setSuccess(result.success ? result.success + index : '');
            console.log("POSTED");
        } catch (error) {
            console.error('Error saving image:', error);
        }
    }
}




  const onSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    setError("");
    setSuccess("");


    startTransition(async () => {
      updateCar(newCar)
            .then(async (data) => {
            
               
                setError(data.error);
                setSuccess(data.success);
              
              // setNewCar({...newCar, id: newCar.id})
              // if(data.newId)
              if(galleryChange)
              {
                await saveImages(gallery, newCar, car.id);;
              }
            }).then(()=>router.replace("/account")) 
    });
    

    
    
}


  return (
    <div className='space-y-6 my-6'>
      
        {/* Select Gallery */}
       
        <div className="relative">
        <span className='label-text-alt'>Gallery</span>
          {!galleryChange &&
            result.car.gallery.length >= 0 && (
            
            <div className='flex gap-2'>
                {
                  result.car.gallery.map((img:any, index:any)=>{
                    const src = img.replace("<ID>",newCar.id as string)
                    console.log(src)
                    return (
                      <div key={index} className={`relative m-4 rounded-xl ${index === newCar.galleryIndex && "border-2"} border-secondary`}
                    onClick={()=>setNewCar({...newCar, galleryIndex: index})}>
                        <img
                            className='w-20 h-20 object-cover rounded-xl'
                            src={`https://media.ghostprotocls.pk/media/inventory/${src}.webp`}
                            alt={`Image ${index + 1}`}
                        />
                        <i className="bg-base hover:bg-secondary absolute top-1 right-1 px-2 rounded-xl" onClick={()=>removeImage(index)}>x</i>
                     </div>
                    )
                  })
                }

                
                
            </div>
          )}
          {
            galleryChange &&
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

        <Button variant={"outline"} size={"sm"} onClick={()=>setgalleryChange((prev)=>!prev)}>{!galleryChange?" Edit Gallery" : "Cancel Change"}</Button>
        <form className='space-y-6' onSubmit={onSubmit}>
        {/* Select Location */}
        <div className='relative'>
          <span className='label-text-alt'>Location</span>
          <SelectCity newCar={newCar} setNewCar={setNewCar}/>

          
        </div>

        {/* Select Model */}
        <div className='relative'>
          <span className='label-text-alt'>Model</span>
          <SelectModel newCar={newCar} setNewCar={setNewCar}/>
          
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
                min={1975}
                max={2024}
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
          <SelectRegistration newCar={newCar} setNewCar={setNewCar}/>

        </div>

        {/* Color and Mileage */}
        <div className="flex justify-between flex-col md:flex-row gap-4 w-full">
            {/* Select Color */}
            <div className='relative w-full'>
              <span className='label-text-alt'>Color</span>
              <Select defaultValue={newCar.color ? newCar.color : 'Black'} onValueChange={(e)=>setNewCar({...newCar,color: e})}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="Black">Black</SelectItem>
                  <SelectItem value="White">White</SelectItem>
                  <SelectItem value="Red">Red</SelectItem>
                  <SelectItem value="Silver">Silver</SelectItem>
                  <SelectItem value="Blue">Blue</SelectItem>
                  <SelectItem value="Gray">Gray</SelectItem>
                  <SelectItem value="Green">Green</SelectItem>
                  <SelectItem value="Yellow">Yellow</SelectItem>
                  <SelectItem value="Orange">Orange</SelectItem>
                  <SelectItem value="Brown">Brown</SelectItem>
                  <SelectItem value="Beige">Beige</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
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
              <p className='label-text-alt mb-4 mt-2 text-end'>{newCar.mileage } km </p>

            </div>
        </div>

        {/* Seller Comments */}
        <div className='relative w-full'>
              <span className='label-text-alt'>Seller Comments</span>
              <Textarea value={newCar.sellerComments} onChange={(e)=>setNewCar({...newCar, sellerComments : e.target.value})} placeholder="Type your message here." />
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

export default EditCarForm
