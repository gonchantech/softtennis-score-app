import styles from "./team-result.module.css";
import React from "react";

interface TeamResultProps {
  name: string;
  games: number;
  player1: string;
  player2: string;
  color: "green" | "indigo";
}

export const TeamResult: React.FC<TeamResultProps> = ({
  name,
  games,
  player1,
  player2,
  color,
}) => {
  return (
    <div className={styles.team}>
      <div
        className={
          color === "green" ? styles.teamNameGreen : styles.teamNameIndigo
        }
      >
        {name}
      </div>
      <div className={styles.games}>{games}</div>
      <div className={styles.players}>
        {player1} / {player2}
      </div>
    </div>
  );
};
