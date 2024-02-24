"use server"

import { CarSchema } from "@/schemas"
import * as z from "zod"
import { auth } from "@/auth"
import {db} from "@/lib/db"
import { getCarsCountByUserId } from "@/data/cars"

import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';


export const postCar = async (values : z.infer<typeof CarSchema>) => {
    const validatedFields = CarSchema.safeParse(values)
    const session = await auth()
    if(!session?.user) return {error: "Youre not Logged In"}
 
    if(!validatedFields.success) return {error: "Invalid Data"}
 
    const carCount = await getCarsCountByUserId(session.user.id as string)
    if(session?.user.adLimit  <= carCount) return {error: "Your adLimit is reached!"}

    try {
        const car = await db.car.create({
            data:{
                make: validatedFields.data.make,
                model: validatedFields.data.model,
                year: validatedFields.data.year,
                price: validatedFields.data.price,
                body: validatedFields.data.body,
                color: validatedFields.data.color,
                gallery: validatedFields.data.gallery,
                engine: validatedFields.data.engine,
                engineCapacity: validatedFields.data.engineCapacity,
                galleryIndex: validatedFields.data.galleryIndex,
                location: validatedFields.data.location,
                mileage: validatedFields.data.mileage,
                registration: validatedFields.data.registration,
                sellerComments: validatedFields.data.sellerComments,
                transmission: validatedFields.data.transmission,
                sellerID: session.user.id as string,

            }
        })
        return {success: "Car Posted", id: car.id}
    }
    catch (error)
    {
        return {error: `Failed to Post Car ${error}`}
    }
    

}

interface FileBlob extends Readable {
    name: string;
}

interface UploadResult {
    success?: string;
    error?: string;
}

interface UploadResult {
    success?: string;
    error?: string;
}


export async function saveDocumentInteraction(formData: FormData) {
    const file = formData.get('img') as File;
    const result =  await saveFile(file);

    return result;
}

async function saveFile(file: File) {
    try {
        // Define the destination directory
        const destinationDir = path.join(process.cwd(), 'public', 'media', 'inventory');

        // Create the directory if it doesn't exist
        if (!fs.existsSync(destinationDir)) {
            fs.mkdirSync(destinationDir, { recursive: true });
        }

        // Define the destination path with the file name
        const destinationPath = path.join(destinationDir, file.name);

        // Read the file data
        const fileData = await file.arrayBuffer();
        
        // Write the file data to the destination path
        fs.writeFileSync(destinationPath, Buffer.from(fileData));

        return {success: "Uploaded Image : "}
        console.log('File saved successfully:', destinationPath);
    } catch (error) {
        return {error: "Failed to Upload Image : "}
        console.error('Failed to save file:', error);
    }
}