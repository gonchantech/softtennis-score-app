import { PlayType } from "./play";
import { Player } from "./player";

export type BallCourse = "cross" | "straight";

export type ErrorCause = "side_out" | "back_out" | "net";

export type RallyLength = "short" | "long";

export interface PointData {
  server: Player;
  firstServeIn: boolean;
  rallyLength: RallyLength;
  player: Player;
  playType: PlayType;
  ballCourse: BallCourse;
  errorCause?: ErrorCause;
  timestamp: number;
  gameNumber: number;
  teamAScore: number;
  teamBScore: number;
  teamAGames: number;
  teamBGames: number;
}

export type RawPointInput = Omit<
  PointData,
  | "timestamp"
  | "teamAScore"
  | "teamBScore"
  | "teamAGames"
  | "teamBGames"
  | "gameNumber"
>;
