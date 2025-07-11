import prisma from "@/lib/prisma";
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";
import { es } from "date-fns/locale";
import { auth } from "@clerk/nextjs/server";

export async function getRevenueByMonth() {
  const { userId } = await auth();
  if (!userId) {
    return [];
  }

  const now = new Date();

  const months = Array.from({ length: 6 }, (_, i) => subMonths(now, 5 - i));

  const result = await Promise.all(
    months.map(async (monthDate) => {
      const start = startOfMonth(monthDate);
      const end = endOfMonth(monthDate);

      const purchases = await prisma.purchase.findMany({
        where: {
          createdAt: {
            gte: start,
            lt: end,
          },
          course: {
            userId: userId,
          },
        },
        include: {
          course: {
            select: {
              price: true,
            },
          },
        },
      });

      const totalRevenue = purchases.reduce((sum, purchase) => {
        const coursePrice = Number.isFinite(
          parseFloat(purchase.course.price || "")
        )
          ? parseFloat(purchase.course!.price!)
          : 0;
        return sum + coursePrice;
      }, 0);

      return {
        month: format(start, "MMMM", { locale: es }),
        revenue: Number(totalRevenue.toFixed(2)),
      };
    })
  );

  return result;
}
