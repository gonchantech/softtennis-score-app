"use client";
import { MatchStateAction, MatchState } from "./types";
import { defaultMatchState } from "./constants/default-match-state";
import { FinalGame, RegularGame } from "./domain";

export const matchStateReducer = (
  state: MatchState,
  action: MatchStateAction
): MatchState => {
  switch (action.type) {
    case "SET_INITIAL_STATE_FROM_CACHE":
      return action.payload;
    case "ADD_POINT": {
      if (state.currentGame === action.payload.matchLength) {
        return FinalGame.addPoint({
          prevState: state,
          pointData: action.payload.pointData,
          matchLength: action.payload.matchLength,
          initialServer: action.payload.initialServer,
        });
      } else {
        return RegularGame.addPoint({
          prevState: state,
          pointData: action.payload.pointData,
          matchLength: action.payload.matchLength,
        });
      }
    }
    case "REMOVE_LATEST_POINT": {
      const newPoints = state.points.slice(0, -1);

      // 2ポイント目以降を削除した場合
      if (action.payload?.previousState) {
        return {
          ...action.payload.previousState,
          points: newPoints,
        };
      }

      // 1個目のポイントを削除した場合
      return {
        ...state,
      };
    }
    case "CHANGE_SERVER":
      return {
        ...state,
        currentServer: action.payload.server,
        currentServerTeam:
          action.payload.server === "A1" || action.payload.server === "A2"
            ? "A"
            : "B",
        servesLeft: 2,
      };

    case "COMPLETE_MATCH_STATE":
      return {
        ...state,
        isMatchComplete: true,
      };
    case "RESET_MATCH_STATE":
      return defaultMatchState;
    default:
      return state;
  }
};
