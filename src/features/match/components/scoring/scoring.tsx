"use client";
import styles from "./scoring.module.css";
import React from "react";
import { ScoreTracker } from "./score-tracker";
import { PointRecorder } from "./point-recorder";
import { PointHistory } from "./point-history";
import { MatchControls } from "./match-control";
import { Stack } from "@/components/stack";
import { useMatchMeta } from "@/context/match-meta";
import { useMatchState } from "@/context/match-state";

type ScoringProps = {
  setShowCompleteModal: (show: boolean) => void;
  setShowErrorModal: (show: boolean) => void;
};

export const Scoring: React.FC<ScoringProps> = ({
  setShowCompleteModal,
  setShowErrorModal,
}) => {
  const { state: matchMeta } = useMatchMeta();
  const { state: matchState, addPoint } = useMatchState();

  const match = {
    matchMeta,
    points: matchState.points,
  };

  return (
    <div className={styles.container}>
      <ScoreTracker matchMeta={matchMeta} matchState={matchState} />
      <Stack direction="horizontal" gap="md">
        <PointRecorder
          matchMeta={matchMeta}
          matchState={matchState}
          addPoint={addPoint}
          setShowErrorModal={setShowErrorModal}
          setShowCompleteModal={setShowCompleteModal}
        />
        <PointHistory forResult={false} match={match} />
      </Stack>

      <MatchControls setShowCompleteModal={setShowCompleteModal} />
    </div>
  );
};
