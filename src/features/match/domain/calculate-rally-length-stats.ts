import { PointData, RallyLengthStat } from "@/types";

export function calculateRallyLengthStats(
  points: PointData[]
): RallyLengthStat {
  const totalPoints = points.length;
  const shortRallyCount = points.filter(
    (point) => point.rallyLength === "short"
  ).length;
  const longRallyCount = points.filter(
    (point) => point.rallyLength === "long"
  ).length;

  let shortRallyPercentage = 0;
  let longRallyPercentage = 0;

  if (totalPoints > 0) {
    shortRallyPercentage = Math.round((shortRallyCount / totalPoints) * 100);
    longRallyPercentage = Math.round((longRallyCount / totalPoints) * 100);
  }

  return {
    shortRallyCount,
    longRallyCount,
    shortRallyPercentage,
    longRallyPercentage,
  };
}
