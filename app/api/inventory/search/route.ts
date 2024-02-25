import { db } from "@/lib/db";

interface FilterConditions {
    location?: { equals: string };
    make?: { equals?: string, contains: string };
    model?: { equals?: string, contains: string};
    registration?: { equals: string };
    transmission?: { equals: boolean };
    year?: { gte?: number; lte?: number };
    price?: { gte?: number; lte?: number };
    title?: { contains?: string};
    body?: { equals: string };
    gpcar?: { equals: boolean };
    featured?: { equals: boolean };
}


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('keyword') || 'All';
    const location = searchParams.get('location') || 'All';
    const make = searchParams.get('make') || 'All';
    const model = searchParams.get('model') || 'All';
    const year_from = searchParams.get('yearFrom') || 'All';
    const year_to = searchParams.get('yearTo') || 'All';
    const price_From = searchParams.get('priceFrom') || 'All';
    const price_To = searchParams.get('priceTo') || 'All';
    const registration = searchParams.get('registration') || 'All';
    const transmission = searchParams.get('transmission') || 'All';
    const body_type = searchParams.get('bodyType') || 'All';
    const ad_type = searchParams.get('adType') || 'All';
    const page = parseInt(searchParams.get('page') || '1');

    try {
        let filter_conditions : FilterConditions = {};

        if (location !== 'All') {
            filter_conditions.location = { equals: location };
        }
        if (make !== 'All') {
            filter_conditions.make = { contains: make };
        }
        if (model !== 'All') {
            filter_conditions.model = { contains: model };
        }
        if (registration !== 'All') {
            filter_conditions.registration = { equals: registration };
        }
        if (transmission !== 'All') {
            filter_conditions.transmission = { equals: (transmission === 'Automatic') };
        }
        if (year_from !== 'All') {
            filter_conditions.year = { gte: parseInt(year_from, 10) };
        }
        if (year_to !== 'All') {
            filter_conditions.year = { ...filter_conditions.year, lte: parseInt(year_to, 10) };
        }
        if (price_From !== 'All') {
            filter_conditions.price = { gte: parseFloat(price_From) };
        }
        if (price_To !== 'All') {
            filter_conditions.price = { ...filter_conditions.price, lte: parseFloat(price_To) };
        }
        if (keyword !== 'All') {
            filter_conditions.title = { contains : keyword };
        }
        if (body_type !== 'All') {
            filter_conditions.body = { equals: body_type };
        }
        if (ad_type !== 'All') {
            if (ad_type === "ghost-yard") {
                filter_conditions.gpcar = { equals: true };
            } else if (ad_type === "featured") {
                filter_conditions.featured = { equals: true };
            } else if (ad_type === "free-listing") {
                filter_conditions = {
                    ...filter_conditions,
                    featured: { equals: false },
                    gpcar: { equals: false }
                };
            }
        }

        const items_per_page = 20;
        const starting_index = (page - 1) * items_per_page;

        const cars = await db.car.findMany({
            where: filter_conditions,
            orderBy: { date: 'desc' },
            skip: starting_index,
            take: items_per_page
        });

        // console.log(cars)
    
        return Response.json(cars);
    } catch (error) {
        console.error("Error fetching home data:", error);
        return Response.json({error:"Unable to Fetch Cars"})
    }
}
