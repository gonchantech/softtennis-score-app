// src/features/scoring/result/components/matchStats/playerStats/PlayerStats.tsx
"use client";
import styles from "./player-stats.module.css";
import React from "react";
import { PointData } from "@/types";
import { PlayerStatCard } from "./player-stats-card";
import { calculatePlayerStats } from "../../../../domain";
import { MatchMeta } from "@/context/match-meta";

interface PlayerStatsProps {
  points: PointData[];
  matchMeta: MatchMeta;
}

export const PlayerStats: React.FC<PlayerStatsProps> = ({
  points,
  matchMeta,
}) => {
  const playerStats = calculatePlayerStats(points, matchMeta);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>選手別獲得ポイント</h3>
      <div className={styles.cardsContainer}>
        {playerStats.map((playerStat) => (
          <PlayerStatCard key={playerStat.player} playerStat={playerStat} />
        ))}
      </div>
    </div>
  );
};
