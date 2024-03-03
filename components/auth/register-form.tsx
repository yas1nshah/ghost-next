"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import { register } from '@/actions/register'

import { useTransition, useState } from 'react'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema } from "@/schemas"

import {Input}  from '@/components/ui/input'
import { Switch } from "@/components/ui/switch"

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
Form,
FormControl,
FormField,
FormItem,
FormLabel,
FormMessage
} from "@/components/ui/form"
import { Button } from '../ui/button'
import FormError from '../form-error'
import FormSuccess from '../form-success'


const RegisterForm = () => {
    const [isPending, startTransition] =  useTransition()

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const [confirmPass, setconfirmPass] = useState("")
    const router = useRouter()

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            phone:"",
            email: "",
            password: "", 
            address: "N/A",
            name:"",
            dealer:false,

        }
    })

    const onSubmit = (values : z.infer<typeof RegisterSchema>) => {
        setError("")
        setSuccess("")

        if(form.getValues().password != confirmPass)
        {
            setError("Passwords did not match")
            return
        }

        startTransition(async()=>{
            register(values)
                .then( (data)=>{
                    setError(data.error)
                    setSuccess(data.success)
                    if(data.success)
                    {
                        router.replace("/account")
                    }

                })
        })
    }
  return (
    <div className="w-full my-4 bg-card p-4 md:p-6 md:flex-grow md:max-w-sm rounded-xl ">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
             className='space-y-6'
            >
                <h2 className='text-2xl font-semibold'>Welcome onBoard! 👋</h2>
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name='dealer'
                        render={({field}) =>(
                            <FormItem  className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <FormLabel>Are you a Delaer?</FormLabel>
                                <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='name'
                        render={({field}) =>(
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        placeholder='Your Name'
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='email'
                        render={({field}) =>(
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        placeholder='user@example.com'
                                        type='email'
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='phone'
                        render={({field}) =>(
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        placeholder='323 12345678'
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {form.getValues('dealer') && <FormField
                        control={form.control}
                        name='address'
                        render={({field}) =>(
                            <FormItem>
                                <FormLabel>Adress</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        placeholder='XXX XXXXXXX'
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />}

                    <FormField
                        control={form.control}
                        name='password'
                        render={({field}) =>(
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        placeholder='********'
                                        type='password'
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

<FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <Input 
                                        onChange={(e)=>setconfirmPass(e.target.value)}
                                        placeholder='********'
                                        type='password'
                                        disabled={isPending}
                                    />
                                <FormMessage/>
                            </FormItem>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button
                        type='submit'
                        className='w-full'
                        disabled={isPending}
                    >
                        Login
                    </Button>
                </div>
                <p className='text-sm'>
                    Alredy Registered?
                    <Link className='text-primary mx-1' href="/account/login">Login Now</Link>
                </p>
            </form>
        </Form>

    </div>
  )
}

export default RegisterForm