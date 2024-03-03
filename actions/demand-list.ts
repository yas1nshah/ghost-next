"use server"

import { DemandListSchema } from "@/schemas";
import * as z from "zod";
import {db} from "@/lib/db"


export const addDemand = async (values:z.infer<typeof DemandListSchema>)=>{

   const validatedFields = DemandListSchema.safeParse(values);

   if(!validatedFields.success)
   {
    return {error: "Invalid fields!"};
   }
   console.log("addinggg")

   const {demand} = validatedFields.data


   await db.demandList.create({
     data:{demand}
   })

   // TODO send verification token email

   return {success: "Created!"}
}


export const demandMarkDone = async (id:string)=>{
  await db.demandList.update({
    where: {id : id},
    data:{ done : true}
  })

  return {success: "Updated!"}
}

export async function getDemandList(page: number) {

  try {
      
      const items_per_page = 20;
      const starting_index = (page - 1) * items_per_page;

      const demands = await db.demandList.findMany({
          where:{done:false},
          orderBy: { date: 'desc' },
          skip: starting_index,
          take: items_per_page
      });

      return demands;

  } catch (error) {
      console.error("Error fetching home data:", error);
      return{error:"Unable to Fetch demands"}
  }
}