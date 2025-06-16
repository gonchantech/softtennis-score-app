"use client";
import styles from "./match-result.module.css";
import React from "react";
import { Match } from "@/types";
import { TeamResult } from "./team-result";
import { GameScores } from "./game-scores";

interface MatchResultProps {
  match: Match;
}

export const MatchResultComponent: React.FC<MatchResultProps> = ({ match }) => {
  const { points, matchMeta } = match;
  const {
    teamAName,
    teamBName,
    playerA1Name,
    playerA2Name,
    playerB1Name,
    playerB2Name,
    matchLength,
  } = matchMeta;

  const teamAGames = points[points.length - 1]?.teamAGames;
  const teamBGames = points[points.length - 1]?.teamBGames;

  // 各ゲームの最終スコアを計算
  const gameScores = points.reduce((acc, point) => {
    acc[point.gameNumber] = {
      teamAScore: point.teamAScore,
      teamBScore: point.teamBScore,
    };
    return acc;
  }, {} as Record<number, { teamAScore: number; teamBScore: number }>);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>試合結果</h2>
        <span className={styles.format}>
          {matchLength === 5 ? "5ゲームマッチ" : "7ゲームマッチ"}
        </span>
      </div>
      <div className={styles.teams}>
        <TeamResult
          name={teamAName}
          games={teamAGames}
          player1={playerA1Name}
          player2={playerA2Name}
          color="green"
        />
        <div className={styles.divider} />
        <TeamResult
          name={teamBName}
          games={teamBGames}
          player1={playerB1Name}
          player2={playerB2Name}
          color="indigo"
        />
      </div>
      <GameScores gameScores={gameScores} />
    </div>
  );
};
