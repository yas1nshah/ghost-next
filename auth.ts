import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import authConfig from "@/auth.config"

import { db } from "@/lib/db"
import { getUserById } from "./data/user"

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
        session.user.role = token.role
        session.user.adLimit = token.adLimit


      }
      return session
    },

    async jwt({ token }) {
      console.log(token)
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