"use server"
import { db } from "@/lib/db";


export async function getCarDetails(id: string) {
 try {
    const car = await db.car.findUniqueOrThrow({where: {id: id as string}});
    const seller = await db.user.findUnique({where: {id: car.sellerID}})
    if(car.active){
      return {car, seller};
    }
    else{

      return { error: 'Car Not Found' };
    }
          

    } catch (error) {
        console.error("Error fetching home data:", error);
        return { error: 'Internal Server Error' };
    }
  }