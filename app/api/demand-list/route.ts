import { db } from "@/lib/db";


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');

    try {
        
        

        const items_per_page = 20;
        const starting_index = (page - 1) * items_per_page;

        const demands = await db.demandList.findMany({
            where:{done:false},
            orderBy: { date: 'desc' },
            skip: starting_index,
            take: items_per_page
        });

        // console.log(cars)
    
        return Response.json(demands);
    } catch (error) {
        console.error("Error fetching home data:", error);
        return Response.json({error:"Unable to Fetch demands"})
    }
}
