// pages/api/homeData.js
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/lib/db";



export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    try {
        const car = await db.car.findUniqueOrThrow({where: {id: id as string}})
        const seller = await db.user.findUnique({where: {id: car.sellerID}})
        

        return Response.json({ car, seller});
    } catch (error) {
        console.error("Error fetching home data:", error);
        return Response.json({ error: 'Internal Server Error' });
    }
  }