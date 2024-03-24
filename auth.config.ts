import Credentials from "next-auth/providers/credentials"

import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "./schemas"
import { getUserByEmail, getUserByPhone } from "./data/user"
import bcrypt from "bcryptjs"; 
import { env } from "process";

 
const authSecret = env['AUTH_SECRET'];


export default {
  
  providers: [Credentials({
    async authorize(credentials: Partial<Record<string, unknown>>, request: Request): Promise<any | null> {
      const validatedFields = LoginSchema.safeParse(credentials)
      
      if(validatedFields.success){
        const {email, password} = validatedFields.data
    
        let user = await getUserByEmail(email)
        if(!user)
        {
          user = await getUserByPhone(email)
        }
    
        if(!user || !user.password) return null;
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (passwordMatch) return user;
      }
    
      return null;
    }
    
  })],
  secret: authSecret,
  
} satisfies NextAuthConfig