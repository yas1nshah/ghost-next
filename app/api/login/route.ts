import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export async function POST(request: Request) {
    const res = await request.json()
    const {email, password} = res;
    console.log(email)
    console.log(password)
    try {
        await signIn("credentials", {email, password, redirectTo: DEFAULT_LOGIN_REDIRECT})
     } catch (error) {
        if(error instanceof AuthError)
        {
           switch (error.type)
           {
              case "CredentialsSignin":
                 return Response.json({error: "Invalid Credentails!"});
                 
              default:
                 return Response.json({error: "Something went Wrong!"});
  
           }
        }
        throw error;
     }
    return Response.json({ res })
  }