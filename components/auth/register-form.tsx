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

        startTransition(async()=>{
            register(values)
                .then( (data)=>{
                    setError(data.error)
                    setSuccess(data.success)
                })
        })
    }
  return (
    <div className="bg-white">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
             className='space-y-6'
            >
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
                                        placeholder='user@example.com'
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
                                        placeholder='XXX XXXXXXX'
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

                    <FormField
                        control={form.control}
                        name='password'
                        render={({field}) =>(
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
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

export default RegisterForm