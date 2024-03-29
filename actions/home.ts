"use server"
import { db } from "@/lib/db"


export const  getHomeData = async () => {
    try {
        const gpCars = await db.car.findMany({ where: { gpcar: true, active: true }, orderBy: { date: "desc" }, take: 8 });
        const featuredCars = await db.car.findMany({ where: { featured: true, gpcar: false, active: true }, orderBy: { date: "desc" }, take: 8 });
        const recentCars = await db.car.findMany({ where: { featured: false, gpcar: false, active: true }, orderBy: { date: "desc" }, take: 8 });
        // console.log(recentCars)
        return { gpCars, featuredCars, recentCars };
    } catch (error) {
        console.error("Error fetching home data:", error);
        return { message: 'Internal Server Error' };
    }
}