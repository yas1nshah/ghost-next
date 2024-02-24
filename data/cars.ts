import {db} from "@/lib/db"


export const getCarsCountByUserId = async (id:string)=> {
    try {
        const cars = await db.car.count({where:{sellerID: id}})
        return cars;
    }
    catch (error)
    {
        return 0;
    }
}