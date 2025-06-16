"use client";
import { createContext } from "react";
import { RawPointInput, Player } from "@/types";
import { MatchLength } from "@/context/match-meta/types";
import { MatchStateAction, MatchState } from "./types";
import { defaultMatchState } from "./constants/default-match-state";

export const MatchStateContext = createContext<{
  state: MatchState;
  dispatch: React.Dispatch<MatchStateAction>;
  setInitialStateFromCache: (matchState: MatchState) => void;
  addPoint: (
    pointData: RawPointInput,
    matchLength: MatchLength,
    initialServer: Player
  ) => void;
  changeServer: (server: Player) => void;
  removeLatestPoint: () => void;
  completeMatch: () => void;
  resetMatchState: () => void;
}>({
  state: defaultMatchState,
  dispatch: () => null,
  setInitialStateFromCache: () => null,
  addPoint: () => null,
  removeLatestPoint: () => null,
  changeServer: () => null,
  completeMatch: () => null,
  resetMatchState: () => null,
});
