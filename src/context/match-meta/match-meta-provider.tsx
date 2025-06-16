"use client";
import { useEffect, useReducer } from "react";
import { MatchMeta } from "./types";
import { MatchMetaContext } from "./match-meta-context";
import { defaultMatchMeta } from "./constants/defaultMatchMeta";
import { matchMetaReducer } from "./match-meta-reducer";

export const MatchMetaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(matchMetaReducer, defaultMatchMeta);

  useEffect(() => {
    const cachedMatchMeta = localStorage.getItem("matchMeta");
    if (cachedMatchMeta) {
      setupMatchMetaFromCache(JSON.parse(cachedMatchMeta));
    }
  }, []);

  const setupMatchMetaFromCache = (matchMeta: MatchMeta) => {
    dispatch({ type: "SET_MATCH_META_FROM_CACHE", payload: matchMeta });
  };

  const setupMatchMeta = (matchMetaData: Partial<MatchMeta>) => {
    localStorage.setItem("matchMeta", JSON.stringify(matchMetaData));
    dispatch({ type: "SETUP_MATCH_META", payload: matchMetaData });
  };

  const resetMatchMeta = () => {
    localStorage.removeItem("matchMeta");
    dispatch({ type: "RESET_MATCH_META" });
  };

  return (
    <MatchMetaContext.Provider
      value={{
        state,
        dispatch,
        setupMatchMetaFromCache,
        setupMatchMeta,
        resetMatchMeta,
      }}
    >
      {children}
    </MatchMetaContext.Provider>
  );
};
