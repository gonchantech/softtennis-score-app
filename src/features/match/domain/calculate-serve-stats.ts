import { ServeStat, PointData } from "@/types";
import { MatchMeta } from "@/context/match-meta";

export function calculateServeStats(
  points: PointData[],
  matchMeta: MatchMeta
): ServeStat[] {
  const initialStats: ServeStat[] = [
    {
      player: "A1",
      name: matchMeta.playerA1Name,
      firstServeAttempts: 0,
      firstServeIn: 0,
      successRate: 0,
    },
    {
      player: "A2",
      name: matchMeta.playerA2Name,
      firstServeAttempts: 0,
      firstServeIn: 0,
      successRate: 0,
    },
    {
      player: "B1",
      name: matchMeta.playerB1Name,
      firstServeAttempts: 0,
      firstServeIn: 0,
      successRate: 0,
    },
    {
      player: "B2",
      name: matchMeta.playerB2Name,
      firstServeAttempts: 0,
      firstServeIn: 0,
      successRate: 0,
    },
  ];

  const statsWithAttempts = points.reduce((stats, point) => {
    const serverStat = stats.find((s) => s.player === point.server);
    if (!serverStat) return stats;

    serverStat.firstServeAttempts += 1;
    if (point.firstServeIn) {
      serverStat.firstServeIn += 1;
    }

    return stats;
  }, initialStats);

  return statsWithAttempts.map((stat) => ({
    ...stat,
    successRate:
      stat.firstServeAttempts > 0
        ? Math.round((stat.firstServeIn / stat.firstServeAttempts) * 100)
        : 0,
  }));
}
