
import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  loggedOutRoutes
} from "@/routes"

 
// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const session = await auth();
  const  {nextUrl} = req;

  if(nextUrl.pathname.startsWith("/admin"))
  {
    if (!session?.user)
    {
          return Response.redirect(new URL( "/account/login", nextUrl))
    }

    else if(session?.user?.role !== "ADMIN" && session?.user?.role !== "TEAM")
    {
      return Response.redirect(new URL( "/", nextUrl))
    }
  }

  
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPrivateRoute = authRoutes.includes(nextUrl.pathname)
  const isLoggedOutRoute = loggedOutRoutes.includes(nextUrl.pathname)
  console.log(req.url)
  console.log(nextUrl.pathname)

  if(isLoggedOutRoute)
    {
      if (session?.user)
        {
          return Response.redirect(new URL( "/account", nextUrl))
        }
    }
  if(isPrivateRoute)
    {
      if (!session?.user)
        {
          return Response.redirect(new URL( "/account/login", nextUrl))
        }
    }

}



// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}