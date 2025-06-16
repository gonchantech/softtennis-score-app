import styles from "./point-info.module.css";
import React from "react";
import { getPlayerName } from "@/utils/getPlayerName";
import { formatTime } from "@/utils/formatTime";
import { Tag } from "@/components/tag";
import { playTypeDescriptions, PointData } from "@/types";

interface PointInfoProps {
  point: PointData;
  playerA1Name: string;
  playerA2Name: string;
  playerB1Name: string;
  playerB2Name: string;
  isTeamAPoint: boolean;
}

export const PointInfo: React.FC<PointInfoProps> = ({
  point,
  playerA1Name,
  playerA2Name,
  playerB1Name,
  playerB2Name,
  isTeamAPoint,
}) => {
  return (
    <div
      className={`${styles.pointItem} ${
        isTeamAPoint ? styles.teamAPoint : styles.teamBPoint
      }`}
    >
      <div>
        <div className={styles.scoreContainer}>
          <span className={styles.score}>
            {point.teamAScore} - {point.teamBScore}
            <span className={styles.gameScore}>
              ({point.teamAGames}-{point.teamBGames})
            </span>
          </span>
          <span className={styles.timestamp}>
            {formatTime(point.timestamp)}
          </span>
        </div>

        <div className={styles.pointInfo}>
          <div className={styles.tagContainer}>
            <Tag size="sm" color="primary">
              1stサーブ: {point.firstServeIn ? "イン" : "フォルト"}
            </Tag>
            <Tag size="sm" color="secondary">
              ラリー: {point.rallyLength === "short" ? "4本以内" : "5本以上"}
            </Tag>
          </div>

          <div>
            <span className={styles.playerName}>
              {getPlayerName(
                point.player,
                playerA1Name,
                playerA2Name,
                playerB1Name,
                playerB2Name
              )}
            </span>{" "}
            {point.errorCause ? "ミス" : "得点"} with{" "}
            <span className={styles.playType}>
              {playTypeDescriptions[point.playType]}
            </span>{" "}
            ({point.ballCourse === "cross" ? "クロス" : "ストレート"})
            {point.errorCause && (
              <span className={styles.errorText}>
                (
                {point.errorCause === "side_out"
                  ? "サイドアウト"
                  : point.errorCause === "back_out"
                  ? "バックアウト"
                  : "ネット"}
                )
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
