'use server'
import { auth } from "@/auth"
import { getUserById } from "@/data/user"
import { db } from "@/lib/db"

export const featureCar = async (id:string)=> {
   
    const session = await auth()
    if(!session?.user) return {error: "Youre not Logged In"}
    
    const userId = session.user.id
    const currentUser = await db.user.findUnique({
        where: {
            id: userId
        },
        select: {
            featured_limit: true
        }
    });
    
    
    if(currentUser?.featured_limit as number <= 0)
    {
       return { error: "You don't have any Feature Credit!"} 
    }

    else{
        const car =  await db.car.update({
            where :{id: id},
            data: {
                featured: true
            }
        })   

        if (currentUser?.featured_limit as number > 0) {
             db.user.update({
                where: {
                    id: userId
                },
                data: {
                    featured_limit: {
                        decrement: 1 
                    }
                }
            });
    }
    
    return {msg: "Car is Now Featured"}
 
    
    
    }
}