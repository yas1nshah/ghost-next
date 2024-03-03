"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import { login } from '@/actions/login'

import { useTransition, useState } from 'react'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from "@/schemas"

import {Input}  from '@/components/ui/input'
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
import Link from 'next/link'

const LoginForm = () => {
    const [isPending, startTransition] =  useTransition()

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "" 
        }
    })

    const onSubmit = (values : z.infer<typeof LoginSchema>) => {
        setError("")
        setSuccess("")

        startTransition(async()=>{
            login(values)
                .then( (data)=>{
                    setError(data.error)
                    setSuccess(data.success)
                })
        })
    }
  return (
    <div className="w-full bg-card my-4 p-4 md:p-6 md:flex-grow md:max-w-sm rounded-xl ">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <h2 className='text-2xl font-semibold'>Welcome Back! 👋</h2>
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name='email'
                        render={({field}) =>(
                            <FormItem>
                                <FormLabel>Email or Phone</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        placeholder='Enter email or phone'
                                        type='text'
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

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
                <p className='text-sm my-4'>
                    {"Don't have an account?"}
                    <Link className='text-primary mx-1' href="/account/register">Register Now</Link>
                </p>

            </form>
        </Form>

    </div>
  )
}

export default LoginForm