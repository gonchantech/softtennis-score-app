import { PlayType, Player } from "@/types";

export interface PlayerStat {
  player: Player;
  name: string;
  pointsWon: number;
  errors: number;
  playTypeBreakdown: Record<PlayType, number>;
  errorBreakdown: Record<PlayType, number>;
}

export interface ServeStat {
  player: Player;
  name: string;
  firstServeAttempts: number;
  firstServeIn: number;
  successRate: number;
}

export interface RallyLengthStat {
  shortRallyCount: number;
  longRallyCount: number;
  shortRallyPercentage: number;
  longRallyPercentage: number;
}

export interface MatchStats {
  playerStats: PlayerStat[];
  serveStats: ServeStat[];
  rallyLengthStats: RallyLengthStat[];
}
