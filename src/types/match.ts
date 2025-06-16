import {
  MatchMeta,
  MatchResultMeta,
} from "@/context/match-meta/types/match-meta";
import { PointData } from "./point";

export interface Match {
  matchMeta: MatchMeta;
  points: PointData[];
}

export interface MatchResult {
  matchResultMeta: MatchResultMeta;
  points: PointData[];
}
