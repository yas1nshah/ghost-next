
import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  privateRoutes
} from "@/routes"

 
// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const session = await auth();
  const  {nextUrl} = req;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  console.log(req.url)
  console.log(nextUrl.pathname)

  if(isPrivateRoute)
    {
      if (!session?.user)
        {
          return Response.redirect(new URL( "/account/login", nextUrl))
        }
    }

  // if(isAuthRoute)
  // {
  //   if (session?.user)
  //   {
  //     return Response.redirect(new URL( DEFAULT_LOGIN_REDIRECT, nextUrl))
  //   }
  // }

}



// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}