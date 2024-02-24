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


export const CarSchema = z.object( {
    title: z.string(),

    galleryIndex : z.number(),
    gallery: z.string().array(),

    make: z.string(),
    model: z.string(),
    year: z.number(),
    price: z.number(),

    location:  z.string(),
    mileage:  z.number(),
    transmission : z.boolean(),

    engine:  z.string(),
    engineCapacity:  z.string(),
    registration:  z.string(),
    body :  z.string(),
    color:  z.string(),

    sellerID: z.string(),
    sellerComments :  z.string(),
})

export const SellerSchema = z.object({
    
})