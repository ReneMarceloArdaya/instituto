import { getRevenueByMonth } from "./getRevenueByMonth";

export async function getRevenueGrowthInfo() {
  const data = await getRevenueByMonth();
  const totalMonths = data.length;

  const prev = data[totalMonths - 2];
  const curr = data[totalMonths - 1];

  const diff = curr.revenue - prev.revenue;
  const increased = diff > 0;

  let percentStr = "0%";

  if (prev.revenue === 0) {
    percentStr = curr.revenue === 0 ? "0%" : "+100%";
  } else {
    const percent = ((curr.revenue - prev.revenue) / prev.revenue) * 100;
    const rounded = Math.round(percent * 100) / 100;
    const sign = rounded > 0 ? "+" : rounded < 0 ? "−" : "";
    percentStr = `${sign}${Math.abs(rounded)}%`;
  }

  const absoluteStr = diff > 0
    ? `+Bs ${diff.toFixed(2)}`
    : `–Bs ${Math.abs(diff).toFixed(2)}`;

  return {
    percent: percentStr,
    valueDiff: absoluteStr,
    increased,
    from: prev.month,
    to: curr.month,
  };
}
