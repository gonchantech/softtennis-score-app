"use client";
import styles from "./point-history.module.css";
import React, { useMemo } from "react";
import { useMatchState } from "@/context/match-state";
import { getIsTeamAPoint } from "@/utils/getIsTeamAPoint";
import { Button } from "@/components/button";
import { PointInfo } from "./point-info";
import { Match } from "@/types";

interface PointHistoryProps {
  forResult: boolean;
  match: Match;
}

export const PointHistory: React.FC<PointHistoryProps> = (props) => {
  const { forResult, match } = props;
  const { removeLatestPoint } = useMatchState();

  const { playerA1Name, playerA2Name, playerB1Name, playerB2Name } =
    match.matchMeta;
  const { points } = match;

  const reversedPoints = useMemo(() => [...points].reverse(), [points]);

  if (points.length === 0) {
    return (
      <div className={styles.emptyMessageContainer}>
        <div className={styles.emptyMessage}>ポイントが記録されていません</div>
      </div>
    );
  }

  return (
    <div className={styles.container} data-testid="point-history">
      <div className={styles.header}>
        <span>ポイント履歴</span>
        {!forResult && (
          <Button
            onClick={removeLatestPoint}
            variant="solid"
            color="danger"
            size="sm"
          >
            最新を削除
          </Button>
        )}
      </div>

      <div className={styles.pointList}>
        {reversedPoints.map((point) => (
          <PointInfo
            key={point.timestamp}
            point={point}
            playerA1Name={playerA1Name}
            playerA2Name={playerA2Name}
            playerB1Name={playerB1Name}
            playerB2Name={playerB2Name}
            isTeamAPoint={getIsTeamAPoint(point)}
          />
        ))}
      </div>
    </div>
  );
};
