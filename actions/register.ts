"use server"

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs"
import {db} from "@/lib/db"
import { getUserByEmail, getUserByPhone } from "@/data/user";


export const register = async (values:z.infer<typeof RegisterSchema>)=>{

   const validatedFields = RegisterSchema.safeParse(values);

   if(!validatedFields.success)
   {
    return {error: "Invalid fields!"};
   }

   const {email, password, name, phone, address, dealer} = validatedFields.data
   const hasedPass = await bcrypt.hash(password, 6)

   
   const existingUser = await getUserByEmail(email)
   const existingUser2 = await getUserByPhone(phone)

   if(existingUser)
   {
      return {error: "Email already in use!"};
   }
   if(existingUser2)
   {
      return {error: "Phone already in use!"};
   }

   await db.user.create({
     data:{ email,
       password : hasedPass,
       name,
       phone,
       address,
       dealer
      }
   })

   // TODO send verification token email

   return {success: "Registered!"}
}