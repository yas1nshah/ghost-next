import { db } from "@/lib/db";
import { auth } from "@/auth";

interface FilterConditions {
    location?: { equals: string };
    make?: { equals?: string, contains: string, mode: any };
    model?: { equals?: string, contains: string, mode: any};
    registration?: { equals: string };
    transmission?: { equals: boolean };
    year?: { gte?: number; lte?: number };
    price?: { gte?: number; lte?: number };
    title?: { contains?: string, mode: any};
    body?: { equals: string, mode: any };
    gpcar?: { equals: boolean };
    featured?: { equals: boolean };
}


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
       const page = parseInt(searchParams.get('page') || '1');
 

    try {
        const session = await auth();
        const userId = session?.user?.id;

        if (!userId) {
            console.error("User ID is undefined in the session:", session);
            return  Response.json({ error: "User ID is undefined" })
        }

        const items_per_page = 2;
        const starting_index = (page - 1) * items_per_page;

        const cars = await db.car.findMany({
            where: { sellerID: userId },
            orderBy: { date: 'desc' },
            skip: starting_index,
            take: items_per_page
        });


        // console.log(cars)
    
        return Response.json(cars);
    } catch (error) {
        console.error("Error fetching Your Cars :", error);
        return Response.json({error:"Unable to Fetch Cars"})
    }
}
