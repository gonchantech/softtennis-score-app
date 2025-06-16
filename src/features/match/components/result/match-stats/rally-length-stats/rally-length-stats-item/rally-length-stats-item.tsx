"use client";
import styles from "./rally-length-stats-item.module.css";
import React from "react";

interface RallyLengthStatItemProps {
  title: string;
  percentage: number;
  count: number;
  isShortRally?: boolean;
}

export const RallyLengthStatItem: React.FC<RallyLengthStatItemProps> = ({
  title,
  percentage,
  count,
  isShortRally = false,
}) => {
  return (
    <div className={styles.statItem}>
      <h4 className={styles.statTitle}>{title}</h4>
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div
            className={`${styles.progressFill} ${
              isShortRally ? styles.shortRally : styles.longRally
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className={styles.percentage}>{percentage}%</span>
      </div>
      <p className={styles.count}>{count}ポイント</p>
    </div>
  );
};
