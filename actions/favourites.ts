"use server"
import { db } from "@/lib/db";
import { Car } from "@prisma/client";


export async function getFavoriteCars(ids: string[]) {
 try {
    var result: Car[] = [];
    for (var id in ids){

        const car = await db.car.findUniqueOrThrow({where: {id: id as string}});
        result.push(car)
    }
    return {results:result};
          

    } catch (error) {
        console.error("Error fetching home data:", error);
        return { error: 'Internal Server Error' };
    }
  }