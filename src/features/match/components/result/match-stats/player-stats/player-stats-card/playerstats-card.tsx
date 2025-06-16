"use client";
import styles from "./player-stats-card.module.css";
import React from "react";
import { PlayerStat } from "@/types";
import { PlayTypeBreakdown } from "./play-type-breakdown";

interface PlayerStatCardProps {
  playerStat: PlayerStat;
}

const getTeamColor = (player: string) => {
  return player.startsWith("A") ? styles.teamA : styles.teamB;
};

const calculateTotalPoints = (playerStat: PlayerStat) => {
  return Object.values(playerStat.playTypeBreakdown).reduce((a, b) => a + b, 0);
};

export const PlayerStatCard: React.FC<PlayerStatCardProps> = ({
  playerStat,
}) => {
  const totalPoints = calculateTotalPoints(playerStat);
  const netPoints = totalPoints - playerStat.errors;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span
          className={`${styles.playerTag} ${getTeamColor(playerStat.player)}`}
        >
          {playerStat.name}
        </span>
        <span className={styles.netPoints}>
          {netPoints > 0 ? "+" : ""}
          {netPoints}
        </span>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h4>決めた回数</h4>
          <span className={styles.totalCount}>{totalPoints}回</span>
        </div>
        <PlayTypeBreakdown breakdown={playerStat.playTypeBreakdown} />
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h4>ミス</h4>
          <span className={styles.totalCount}>{playerStat.errors}回</span>
        </div>
        <PlayTypeBreakdown breakdown={playerStat.errorBreakdown} />
      </div>
    </div>
  );
};
