"use client"
import React from 'react'
import { useForm } from 'react-hook-form'

import { useTransition, useState } from 'react'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { DemandListSchema } from "@/schemas"

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
import { addDemand } from '@/actions/demand-list'
import { useRouter } from 'next/navigation'

const DemandListForm = () => {
    const router = useRouter()
    const [isPending, startTransition] =  useTransition()

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof DemandListSchema>>({
        resolver: zodResolver(DemandListSchema),
        defaultValues: {
            demand: "", 
            date: null,
            id: "",
        }
    })

    const onSubmit = (values : z.infer<typeof DemandListSchema>) => {
        setError("")
        setSuccess("")

        startTransition(async()=>{
            addDemand(values)
                .then( (data)=>{
                    setError(data.error)
                    setSuccess(data.success)

                    if(data.success)
                    {
                        router.replace("/demand-list")
                    }
                })
        })
    }
  return (
    <div className="mx-auto w-full bg-card my-4 p-4 md:p-6 md:flex-grow md:max-w-sm rounded-xl ">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <h2 className='text-2xl font-semibold'>Add New Demand!</h2>
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name='demand'
                        render={({field}) =>(
                            <FormItem>
                                <FormLabel>Enter Demand</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        placeholder='Enter Demand'
                                        
                                        
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
                    Add
                    </Button>
                </div>
   

            </form>
        </Form>

    </div>
  )
}

export default DemandListForm