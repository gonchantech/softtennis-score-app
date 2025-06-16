"use client";
import styles from "./serve-stats.module.css";
import React from "react";
import { PointData } from "@/types";
import { ServeStatsTable } from "./serve-stats-table";
import { calculateServeStats } from "../../../../domain";
import { MatchMeta } from "@/context/match-meta";

interface ServeStatsProps {
  points: PointData[];
  matchMeta: MatchMeta;
}

export const ServeStats: React.FC<ServeStatsProps> = ({
  points,
  matchMeta,
}) => {
  const serveStats = calculateServeStats(points, matchMeta);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>サーブ統計</h3>
      <ServeStatsTable serveStats={serveStats} />
    </div>
  );
};
