"use client";
import styles from "./rally-length-stats.module.css";
import React from "react";
import { PointData } from "@/types";
import { RallyLengthStatItem } from "./rally-length-stats-item";
import { calculateRallyLengthStats } from "../../../../domain";

interface RallyLengthStatsProps {
  points: PointData[];
}

export const RallyLengthStats: React.FC<RallyLengthStatsProps> = ({
  points,
}) => {
  const stats = calculateRallyLengthStats(points);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>ラリー長の統計</h3>
      <div className={styles.statsContainer}>
        <RallyLengthStatItem
          title="4本以内のラリー"
          percentage={stats.shortRallyPercentage}
          count={stats.shortRallyCount}
          isShortRally
        />
        <RallyLengthStatItem
          title="5本以上のラリー"
          percentage={stats.longRallyPercentage}
          count={stats.longRallyCount}
        />
      </div>
    </div>
  );
};
