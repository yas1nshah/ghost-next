import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import authConfig from "@/auth.config"

import { db } from "@/lib/db"
import { getUserById } from "./data/user"


declare module "next-auth" {
  interface User {
    /** The user's postal address. */
    role: string
    adLimit : number
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


      }
      return session
    },

    async jwt({ token }) {
      if(!token.sub) return token;

      const existingUser = await getUserById(token.sub)
      
      if(!existingUser) return token;
      
      token.role = existingUser.role
      token.adLimit = existingUser.ad_limit
      
      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})