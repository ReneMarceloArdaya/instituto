import { Payments, SuscriptorChart, TotalRevenue } from "./components";


export default function AnalyticsPage() {
  return (
    <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SuscriptorChart />
            <TotalRevenue />
        </div>
        <Payments />
    </div>
  )
}
