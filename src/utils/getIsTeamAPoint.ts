import { PointData, RawPointInput } from "@/types";

export const getIsTeamAPoint = (point: PointData | RawPointInput) => {
  const lastShotTeam = point.player.startsWith("A") ? "A" : "B";
  return point.errorCause ? lastShotTeam === "B" : lastShotTeam === "A";
};
