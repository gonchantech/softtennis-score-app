import { createContext } from "react";
import { MatchMeta, MatchMetaAction } from "./types";
import { defaultMatchMeta } from "./constants/default-match-meta";

export const MatchMetaContext = createContext<{
  state: MatchMeta;
  dispatch: React.Dispatch<MatchMetaAction>;
  setupMatchMetaFromCache: (matchMeta: MatchMeta) => void;
  setupMatchMeta: (matchMetaData: Partial<MatchMeta>) => void;
  resetMatchMeta: () => void;
}>({
  state: defaultMatchMeta,
  dispatch: () => null,
  setupMatchMetaFromCache: () => null,
  setupMatchMeta: () => null,
  resetMatchMeta: () => null,
});
