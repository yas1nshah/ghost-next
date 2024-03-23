import { db } from "@/lib/db";

interface FilterConditions {
    location?: { equals: string };
    make?: { equals?: string, contains: string, mode: any };
    model?: { equals?: string, contains: string, mode: any};
    color?: { equals?: string, contains: string, mode: any};
    registration?: { equals: string };
    transmission?: { equals: boolean };
    year?: { gte?: number; lte?: number };
    price?: { gte?: number; lte?: number };
    title?: { contains?: string, mode: any};
    body?: { equals: string, mode: any };
    gpcar?: { equals: boolean };
    featured?: { equals: boolean };
    AND? : any
}

export async function getSearchCars(
    keyword: string = 'All',
    location: string = 'All',
    make: string = 'All',
    model: string = 'All',
    year_from: string = 'All',
    year_to: string = 'All',
    price_From: string = 'All',
    price_To: string = 'All',
    registration: string = 'All',
    transmission: string = 'All',
    color: string = 'All',
    body_type: string = 'All',
    adType: string = 'All',
    page: number = 1
) {
   
    try {
        let filter_conditions : FilterConditions = {};

        if (location !== 'All') {
            filter_conditions.location = { equals: location };
        }
        if (make !== 'All') {
            filter_conditions.make = { contains: make, mode: 'insensitive' };
        }
        if (model !== 'All') {
            filter_conditions.model = { contains: model, mode: 'insensitive' };
        }
        if (registration !== 'All') {
            filter_conditions.registration = { equals: registration };
        }
       
        if (color !== 'All') {
            filter_conditions.color = { contains: color, mode: 'insensitive' };
        }

        if (transmission !== 'All') {
            filter_conditions.transmission = { equals: (transmission.toLowerCase() === 'auto') };
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
            // filter_conditions.title = { contains : keyword, mode: 'insensitive' };
            // Check if keyword matches any part of year_from or year_to
            const keywordYear = parseInt(keyword.match(/\b\d{4}\b/)?.[0] ?? '', 10);
            const title = keyword.replace(keywordYear.toString(), "").slice()
            if (!isNaN(keywordYear)) {
                console.log(keywordYear)
                filter_conditions.AND = [
            {
                year: {
                    lte: keywordYear,
                    gte: keywordYear
                }
            },
            // {year: {lte:2004,gte:2004}}, {year: {lte:2005,gte:2005}}
            {
                title: {
                    contains: title,
                    mode: 'insensitive'
                }
            }
                ];
            } else {
                // If keyword doesn't contain a valid year, just search in title
                filter_conditions.title = {
                    contains: keyword,
                    mode: 'insensitive'
                };
            }
        }
        
        if (body_type !== 'All') {
            filter_conditions.body = { equals: body_type, mode: 'insensitive' };
        }
       
        if (adType !== 'All') {
            if (adType === "ghost-yard") {
                filter_conditions.gpcar = { equals: true };
            } else if (adType === "featured") {
                filter_conditions.featured = { equals: true };
            } else if (adType === "free-listing") {
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
            // where: {OR:[]},
            orderBy: { date: 'desc' },
            skip: starting_index,
            take: items_per_page
        });
        // console.log(cars)

        return cars;
    } catch (error) {
        console.error("Error fetching home data:", error);
        throw new Error("Unable to Fetch Cars");
    }
}

export async function GetMyAds(id: string, page: number) {
    const items_per_page = 10;
    const starting_index = await (page - 1) * items_per_page;
    
    const cars = await db.car.findMany({
        where: {
            sellerID: id
        },
        take: items_per_page,
        skip: starting_index
    });

    return cars;
}
