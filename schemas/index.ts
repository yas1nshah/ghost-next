import * as z from "zod";


export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is Required"
    }),
    password: z.string().min(1,{
        message: "Password is Required"
    }),
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is Required"
    }),
    name: z.string().min(1,{
        message: "Name is Required"
    }),
    phone: z.string().min(1,{
        message: "Phone is Required"
    }),
    address: z.string(),
    dealer: z.boolean(),
    password: z.string().min(1,{
        message: "Password is Required"
    }),
})