"use client";
import styles from "./play-type-breakdown.module.css";
import React from "react";
import { PlayType, playTypeDescriptions } from "@/types";

interface PlayTypeBreakdownProps {
  breakdown: Record<PlayType, number>;
}

export const PlayTypeBreakdown: React.FC<PlayTypeBreakdownProps> = ({
  breakdown,
}) => {
  return (
    <div className={styles.breakdown}>
      {Object.entries(breakdown)
        .filter(([, count]) => count > 0)
        .map(([playType, count]) => (
          <div key={playType} className={styles.breakdownItem}>
            <span>{playTypeDescriptions[playType as PlayType]}</span>
            <span className={styles.count}>{count}回</span>
          </div>
        ))}
    </div>
  );
};
