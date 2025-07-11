import prisma from "@/lib/prisma";
import { format, subMonths , startOfMonth } from "date-fns";
import { es } from "date-fns/locale";
import { auth } from "@clerk/nextjs/server";

export async function getSuscribesByMonth() {
    const {userId} = await auth();
    if(!userId){
        return []
    }

    const now = new Date();
    const sixMonthsAgo = startOfMonth(subMonths(now, 5));

    const purchases = await prisma.purchase.findMany({
        where: {
            createdAt: {
                gte: sixMonthsAgo,
            },
            course: {
                userId: userId,
            }
        },
        select: {
            createdAt: true,
        },
    });

    const months = Array.from({ length: 6 }, (_, i) => {
        const date = subMonths(now, 5 - i)

        return {
            month: format(date, "LLLL", { locale: es }),
            count: 0,
            date: format(date, "yyyy-MM"),
        }
    });

    purchases.forEach((purchases) => {
        const purchaseMonth = format(purchases.createdAt, "yyyy-MM");
        const month = months.find((m) => m.date === purchaseMonth)
        if (month) {
            month.count += 1;
        }
    })

    return months.map(({month, count}) => ({
        month,
        users: count,
    }))
    


}