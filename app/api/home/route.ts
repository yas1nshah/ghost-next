// pages/api/homeData.js
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/lib/db";



export async function GET() {
    try {
        const gpCars = await db.car.findMany({ where: { gpcar: true }, orderBy: { date: "desc" }, take: 8 });
        const featuredCars = await db.car.findMany({ where: { featured: true, gpcar: false }, orderBy: { date: "desc" }, take: 8 });
        const recentCars = await db.car.findMany({ where: { featured: false, gpcar: false }, orderBy: { date: "desc" }, take: 8 });

        return Response.json({ gpCars, featuredCars, recentCars });
    } catch (error) {
        console.error("Error fetching home data:", error);
        return Response.json({ message: 'Internal Server Error' });
    }
  }