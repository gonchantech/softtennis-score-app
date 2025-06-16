import { defaultMatchMeta } from "./constants/default-match-meta";
import { MatchMetaAction, MatchMeta } from "./types";

export const matchMetaReducer = (
  state: MatchMeta,
  action: MatchMetaAction
): MatchMeta => {
  switch (action.type) {
    case "SET_MATCH_META_FROM_CACHE":
      return action.payload;
    case "RESET_MATCH_META":
      return defaultMatchMeta;
    case "SETUP_MATCH_META":
      return {
        ...state,
        ...action.payload,
      };
  }
};
