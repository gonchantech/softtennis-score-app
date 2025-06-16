import { RawPointInput, Player } from "@/types";
import { MatchLength } from "@/context/match-meta/types";
import { MatchState } from "./match-state";

export type MatchStateAction =
  | { type: "SET_INITIAL_STATE_FROM_CACHE"; payload: MatchState }
  | {
      type: "ADD_POINT";
      payload: {
        pointData: RawPointInput;
        matchLength: MatchLength;
        initialServer: Player;
      };
    }
  | { type: "REMOVE_LATEST_POINT"; payload?: { previousState: MatchState } }
  | { type: "CHANGE_SERVER"; payload: { server: Player } }
  | { type: "COMPLETE_MATCH_STATE" }
  | { type: "RESET_MATCH_STATE" };
