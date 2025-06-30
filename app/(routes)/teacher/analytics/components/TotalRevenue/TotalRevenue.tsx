"use client";
import { Loader2, TrendingDown, TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { TotalRevenueProps } from "./TotalRevenue.type";
import { useEffect, useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
export const description = "A line chart with a label";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(217, 91%, 60%)",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(217, 91%, 60%)",
  },
} satisfies ChartConfig;

export function TotalRevenue() {
  const [data, setData] = useState<TotalRevenueProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [growth, setGrowth] = useState<any>(null);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const chart = await axios("/api/analytics/revenueByMonth");
        const growth = await axios("/api/analytics/revenueGrowth");
        setData(chart.data);
        setGrowth(growth.data);
      } catch (error) {
        console.log("[TotalRevenue] error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRevenue();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total beneficios</CardTitle>
        <CardDescription>Beneficio de los últimos 6 meses</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center p-6 bg-white rounded-md shadow-md animate-pulse">
            <Loader2 className="mr-2 h-5 w-5 animate-spin text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Cargando beneficios...
            </span>
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={data}
              margin={{
                top: 20,
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                dataKey="revenue"
                type="natural"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-desktop)",
                }}
                activeDot={{
                  r: 6,
                }}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {isLoading ? (
          <div className="flex items-center justify-center p-6 bg-white rounded-md shadow-md animate-pulse">
            <Loader2 className="mr-2 h-5 w-5 animate-spin text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Cargando Lógica...
            </span>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 font-medium leading-none">
              <span
                className={cn(
                  growth.increased ? "text-green-600" : "text-red-600"
                )}
              >
                {growth.percent} ({growth.valueDiff})
              </span>
              <span className="text-muted-foreground">
                respecto a {growth.from}
              </span>
              {growth.increased ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </div>
            <div className="text-muted-foreground leading-none">
              Mostrando ingresos de los últimos 6 meses
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
