"use client";

import { useContext } from "react";
import { MatchStateContext } from "./match-state-context";

export const useMatchState = () => {
  const context = useContext(MatchStateContext);
  if (!context) {
    throw new Error("useMatchState must be used within a MatchStateProvider");
  }
  return context;
};
