'use server'

import { db } from "@/lib/db";
import fs from 'fs';
import path from 'path';

export async function getRecentAds(page: number) {
    try {
        const items_per_page = 20;
        const starting_index = (page - 1) * items_per_page;
  
        const cars = await db.car.findMany({
            where:{active:false},
            orderBy: { date: 'desc' },
            skip: starting_index,
            take: items_per_page
        });
  
        return cars;
  
    } catch (error) {
        console.error("Error fetching recent ads:", error);
        return{error:"Unable to Fetch Recent Ads"}
    }
  }

export async function deleteAd(id: string) {
    try {
        
        const car = await db.car.delete({
            where:{id:id},
        });
        
        for (const imageName of car.gallery) {
            const imgName = imageName.replace("<ID>", car.id);
            await deleteImage(car.id, imgName);
        }

        console.log(car)

        if(car)
        return {msg: "Ad is Deleted"};
  
    } catch (error) {
        console.error("Error fetching recent ads:", error);
        return{error:"Unable to Delete Ad"}
    }
  }

async function deleteImage(carId: string, imageName: string) {
    try {
        // Append ".webp" to the image name
        const imageNameWithExtension = imageName + '.webp';

        // Define the path to the image file
        const imagePath = path.join(process.cwd(), 'public', 'media', 'inventory', imageNameWithExtension);

        // Check if the file exists
        if (fs.existsSync(imagePath)) {
            // Delete the file
            fs.unlinkSync(imagePath);
            console.log('Image deleted successfully:', imagePath);
            return { success: 'Image deleted successfully' };
        } else {
            console.log('Image not found:', imagePath);
            return { error: 'Image not found' };
        }
    } catch (error) {
        console.error('Failed to delete image:', error);
        return { error: 'Failed to delete image' };
    }
}

export async function makeAdLive(id: string) {
    try {
        
        const cars = await db.car.update({
            data:{active:true},
            where:{id:id},
        });
        
        if(cars)
        return {msg: "Ad is finally Live"};
  
    } catch (error) {
        console.error("Error fetching recent ads:", error);
        return{error:"Unable to make Ad Live"}
    }
  }


export async function printWord() {
    console.log("hello")
  }