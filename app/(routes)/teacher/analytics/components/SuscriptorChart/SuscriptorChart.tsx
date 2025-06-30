"use client";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
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

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { useEffect, useState } from "react";
import { SuscriptorChartProps, GrowthDataProps } from "./SuscriptorChart.type";
import axios from "axios";
export const description = "A bar chart with a label";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(217, 91%, 60%)",
  },
} satisfies ChartConfig;

export function SuscriptorChart() {
  const [data, setData] = useState<SuscriptorChartProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [growth, setGrowth] = useState<GrowthDataProps | null>(null);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const chart = await axios("/api/analytics/totalSuscriptors");
        const growth = await axios("/api/analytics/suscriptorGrowth");
        setData(chart.data);
        setGrowth(growth.data);
      } catch (error) {
        console.log("[SuscriptorChart] error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubscribers();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Últimos suscriptores</CardTitle>
        <CardDescription>
          Últimos suscriptores en los últimos 6 meses
        </CardDescription>
      </CardHeader>
      {isLoading ? (
        <div className="flex items-center justify-center p-6 bg-white rounded-md shadow-md animate-pulse">
          <Loader2
            className={cn("mr-2 h-5 w-5 animate-spin text-muted-foreground")}
          />
          <span className="text-sm text-muted-foreground">
            Cargando suscriptores...
          </span>
        </div>
      ) : (
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={data}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="users" fill="var(--color-desktop)" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      )}
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {isLoading ? (
          <div className="flex items-center justify-center p-6 bg-white rounded-md shadow-md animate-pulse">
            <Loader2
              className={cn("mr-2 h-5 w-5 animate-spin text-muted-foreground")}
            />
            <span className="text-sm text-muted-foreground">
              Cargando Lógica...
            </span>
          </div>
        ) : (
          <>
            {growth && growth.increased ? (
              <div>
                <div className="flex gap-2 leading-none font-medium">
                  Crecimiento positivo de un{" "}
                  <span className="font-bold">{growth.percent}</span> este mes{" "}
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div className="text-muted-foreground leading-none">
                  Este mes hubo un incremento de{" "}
                  <span className="font-bold">{growth.usersDiff}</span> usuarios
                  en comparación con el mes anterior.
                </div>
              </div>
            ) : (
              <div>
                <div className="flex gap-2 leading-none font-medium">
                  Crecimiento negativo de un{" "}
                  <span className="font-bold">{growth?.percent}</span> este mes{" "}
                  <TrendingDown className="h-4 w-4 text-red-600" />
                </div>
                <div className="text-muted-foreground leading-none">
                  Hubo una disminución de{" "}
                  <span className="font-bold">{growth?.usersDiff}</span>{" "}
                  usuarios este mes respecto al mes anterior.
                </div>
              </div>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}
