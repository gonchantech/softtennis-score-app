import styles from "./game-scores.module.css";
import React from "react";

interface GameScoresProps {
  gameScores: Record<number, { teamAScore: number; teamBScore: number }>;
}

export const GameScores: React.FC<GameScoresProps> = ({ gameScores }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>ゲーム別スコア</h3>
      <div className={styles.grid}>
        {Object.entries(gameScores).map(([gameNumber, scores]) => (
          <div
            key={gameNumber}
            className={`${styles.scoreCard} ${
              scores.teamAScore > scores.teamBScore
                ? styles.bgGreen
                : styles.bgIndigo
            }`}
          >
            <div className={styles.gameLabel}>第{gameNumber}ゲーム</div>
            <div className={styles.score}>
              {scores.teamAScore} - {scores.teamBScore}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
