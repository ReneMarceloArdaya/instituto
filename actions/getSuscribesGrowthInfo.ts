import { getSuscribesByMonth } from "./getSuscribesByMonth";

export async function getSuscribesGrowthInfo() {
  const data = await getSuscribesByMonth();
  const totalMonths = data.length;

  const prev = data[totalMonths - 2]; // penúltimo mes
  const curr = data[totalMonths - 1]; // último mes

  const absoluteChange = curr.users - prev.users;
  const increased = absoluteChange > 0;

  let percentStr = "0%";

  if (prev.users === 0) {
    if (curr.users === 0) {
      percentStr = "0%";
    } else {
      percentStr = "+100%";
    }
  } else {
    const percentChange = ((curr.users - prev.users) / prev.users) * 100;
    const rounded = Math.round(percentChange * 100) / 100;
    const sign = rounded > 0 ? "+" : rounded < 0 ? "−" : "";
    percentStr = `${sign}${Math.abs(rounded)}%`;
  }

  const absoluteStr = absoluteChange > 0
    ? `+${absoluteChange}`
    : `${absoluteChange}`;

  return {
    percent: percentStr,
    usersDiff: absoluteStr,
    increased,
  };
  }
  