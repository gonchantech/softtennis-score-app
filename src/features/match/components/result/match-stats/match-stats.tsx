"use client";
import styles from "./match-stats.module.css";
import { Match } from "@/types";
import { RallyLengthStats } from "./rally-length-stats";
import { ServeStats } from "./serve-stats";
import { PlayerStats } from "./player-stats";

interface MatchStatsProps {
  match: Match;
}

export const MatchStatsComponent: React.FC<MatchStatsProps> = ({ match }) => {
  const { points, matchMeta } = match;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>試合統計</h2>
      <PlayerStats points={points} matchMeta={matchMeta} />
      <RallyLengthStats points={points} />
      <ServeStats points={points} matchMeta={matchMeta} />
    </div>
  );
};
