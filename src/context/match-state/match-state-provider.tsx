"use client";

import { useEffect, useRef, useReducer } from "react";
import { RawPointInput, Player } from "@/types";
import { MatchLength } from "@/context/match-meta/types";
import { MatchState } from "./types";
import { MatchStateContext } from "./match-state-context";
import { matchStateReducer } from "./match-state-reducer";
import { defaultMatchState } from "./constants/default-match-state";

export const MatchStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const stateHistory = useRef<MatchState[]>([]);
  const [state, dispatch] = useReducer(matchStateReducer, defaultMatchState);

  useEffect(() => {
    const cachedMatchState = localStorage.getItem("matchState");
    if (cachedMatchState) {
      setInitialStateFromCache(JSON.parse(cachedMatchState));
    }
  }, []);

  useEffect(() => {
    stateHistory.current = [...stateHistory.current, state];
    localStorage.setItem("matchState", JSON.stringify(state));
  }, [state]);

  const setInitialStateFromCache = (matchState: MatchState) => {
    dispatch({ type: "SET_INITIAL_STATE_FROM_CACHE", payload: matchState });
  };

  const addPoint = (
    pointData: RawPointInput,
    matchLength: MatchLength,
    initialServer: Player
  ) => {
    dispatch({
      type: "ADD_POINT",
      payload: { pointData, matchLength, initialServer },
    });
  };

  const removeLatestPoint = () => {
    if (stateHistory.current.length >= 2) {
      const previousState =
        stateHistory.current[stateHistory.current.length - 2];

      // 最新の状態を削除(previousがまたstateリストに追加されるので二個消しておく)
      stateHistory.current = stateHistory.current.slice(0, -2);

      dispatch({ type: "REMOVE_LATEST_POINT", payload: { previousState } });
    } else {
      dispatch({ type: "REMOVE_LATEST_POINT" });
    }
  };

  const completeMatch = () => {
    dispatch({ type: "COMPLETE_MATCH_STATE" });
  };

  const changeServer = (server: Player) => {
    dispatch({ type: "CHANGE_SERVER", payload: { server } });
  };

  const resetMatchState = () => {
    stateHistory.current = [];
    localStorage.removeItem("matchState");
    dispatch({ type: "RESET_MATCH_STATE" });
  };

  return (
    <MatchStateContext.Provider
      value={{
        state,
        dispatch,
        setInitialStateFromCache,
        addPoint,
        changeServer,
        removeLatestPoint,
        completeMatch,
        resetMatchState,
      }}
    >
      {children}
    </MatchStateContext.Provider>
  );
};
