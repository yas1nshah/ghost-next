
import authConfig from "@/auth.config"
import NextAuth from "next-auth"
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  privateRoutes
} from "@/routes"

const {auth} = NextAuth(authConfig)

export default auth((req) => {
  const  {nextUrl} = req;
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  // req.auth
  if(isPrivateRoute)
    {
      if (!isLoggedIn)
        {
          return Response.redirect(new URL( "/account/login", nextUrl))
        }
    }

  if(isAuthRoute)
  {
    if (isLoggedIn)
    {
      return Response.redirect(new URL( DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
  }
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}