"use client";
import styles from "./serve-stats-table.module.css";
import React from "react";
import { ServeStat } from "@/types";

interface ServeStatsTableProps {
  serveStats: ServeStat[];
}

const getTeamColor = (player: string) => {
  return player.startsWith("A") ? styles.teamA : styles.teamB;
};

export const ServeStatsTable: React.FC<ServeStatsTableProps> = ({
  serveStats,
}) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>選手</th>
            <th>ファーストサーブ試行</th>
            <th>成功</th>
            <th>成功率</th>
          </tr>
        </thead>
        <tbody>
          {serveStats.map((serveStat) => (
            <tr key={serveStat.player}>
              <td>
                <span
                  className={`${styles.playerTag} ${getTeamColor(
                    serveStat.player
                  )}`}
                >
                  {serveStat.name}
                </span>
              </td>
              <td>{serveStat.firstServeAttempts}回</td>
              <td>{serveStat.firstServeIn}回</td>
              <td>
                {serveStat.firstServeAttempts > 0 ? (
                  <span className={styles.successRate}>
                    {serveStat.successRate}%
                  </span>
                ) : (
                  <span className={styles.noData}>-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
