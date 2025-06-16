import { Player } from "@/types";

export type MatchLength = 5 | 7;

export interface MatchMeta {
  matchLength: MatchLength;
  teamAName: string;
  teamBName: string;
  playerA1Name: string;
  playerA2Name: string;
  playerB1Name: string;
  playerB2Name: string;
  initialServer: Player;
}

export type MatchResultMeta = MatchMeta & {
  id: string;
  ownerId: string;
  teamAGames: number;
  teamBGames: number;
  savedAt: Date;
};
