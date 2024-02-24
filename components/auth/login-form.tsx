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
    <div >
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
             className='space-y-6 p-4'
            >
                <div className="space-y-4">
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

            </form>
        </Form>

    </div>
  )
}

export default LoginForm