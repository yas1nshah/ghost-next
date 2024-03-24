import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import authConfig from "@/auth.config"

import { db } from "@/lib/db"
import { getUserById } from "./data/user"
import { env } from "process"


const authSecret = env['AUTH_SECRET'];

declare module "next-auth" {
  interface User {
    /** The user's postal address. */
    role: string
    adLimit : number
    dealer: boolean
    date_joined: Date
  }
}


export const {
     handlers: {GET, POST},
      auth,
      signIn,
      signOut
     } = NextAuth({
  callbacks:{
    async session({ session, user, token }) {
      if(token.sub && session.user)
      {
        session.user.id = token.sub
        session.user.role = token.role as string
        session.user.adLimit = token.adLimit as number
        session.user.date_joined = token.date_joined as Date 

      }
      return session
    },

    async jwt({ user, trigger, session, token }) {
      
      
      if(!token.sub) return token;

      const existingUser = await getUserById(token.sub)
      
      if(!existingUser) return token;
      
      token.role = existingUser.role
      token.adLimit = existingUser.ad_limit
      token.dealer = existingUser.dealer
      token.date_joined = existingUser.date_joined
      
      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },

  trustHost: true,
  
  ...authConfig,
})