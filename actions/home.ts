"use server"
import { db } from "@/lib/db"
import { revalidatePath } from 'next/cache'

export const getHomeData = async () => {
    try {
        const gpCars = await db.car.findMany({ where: { gpcar: true, active: true }, orderBy: { date: "desc" }, take: 8 });
        const featuredCars = await db.car.findMany({ where: { featured: true, gpcar: false, active: true }, orderBy: { date: "desc" }, take: 8 });
        const recentCars = await db.car.findMany({ where: { featured: false, gpcar: false, active: true }, orderBy: { date: "desc" }, take: 8 });
        return { gpCars, featuredCars, recentCars };
    } catch (error) {
        console.error("Error fetching home data:", error);
        return { message: 'Internal Server Error' };
    }
}

// Revalidate data every 2 minutes
const revalidateInterval = 2 * 60 * 1000; // 2 minutes in milliseconds

const revalidateHomeData = () => {
    setInterval(async () => {
        try {
            await getHomeData();
            revalidatePath('/');
            console.log("Home data revalidated.");
        } catch (error) {
            console.error("Error revalidating home data:", error);
        }
    }, revalidateInterval);
}

// Call the revalidate function to start the interval
revalidateHomeData();
