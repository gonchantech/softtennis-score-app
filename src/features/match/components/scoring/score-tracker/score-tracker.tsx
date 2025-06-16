"use client";
import styles from "./score-tracker.module.css";
import React from "react";
import { MatchMeta } from "@/context/match-meta";
import { MatchState } from "@/context/match-state";

type ScoreTrackerProps = {
  matchMeta: MatchMeta;
  matchState: MatchState;
};

export const ScoreTracker: React.FC<ScoreTrackerProps> = ({
  matchMeta,
  matchState,
}) => {
  const {
    teamAScore,
    teamBScore,
    teamAGames,
    teamBGames,
    currentServer,
    isDeuce,
    isAdvantage,
    advantageTeam,
    currentGame,
  } = matchState;

  const isTeamAServing = currentServer === "A1" || currentServer === "A2";
  const currentServerName =
    currentServer === "A1"
      ? matchMeta.playerA1Name
      : currentServer === "A2"
      ? matchMeta.playerA2Name
      : currentServer === "B1"
      ? matchMeta.playerB1Name
      : matchMeta.playerB2Name;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className="font-semibold">
          {matchMeta.matchLength === 5 ? "5ゲームマッチ" : "7ゲームマッチ"}
        </span>
      </div>

      <div className={styles.scoreContainer}>
        {/* Team A Score */}
        <div
          className={[
            styles.teamScore,
            isTeamAServing ? styles.servingA : "",
            advantageTeam === "A" ? styles.advantage : "",
          ].join(" ")}
        >
          <div className={styles.teamInfo}>
            <div className={styles.teamNameA}>{matchMeta.teamAName}</div>
            <div className={styles.score}>{teamAScore}点</div>
            <div className={styles.games}>{teamAGames}ゲーム</div>
            <div className={styles.players}>
              <div
                className={[
                  styles.player,
                  currentServer === "A1" ? styles.serverNameA : "",
                ].join(" ")}
              >
                {matchMeta.playerA1Name}{" "}
                {currentServer === "A1" && (
                  <span className={styles.serverNameA}>(サーブ)</span>
                )}
              </div>
              <div
                className={[
                  styles.player,
                  currentServer === "A2" ? styles.serverNameA : "",
                ].join(" ")}
              >
                {matchMeta.playerA2Name}{" "}
                {currentServer === "A2" && (
                  <span className={styles.serverNameA}>(サーブ)</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Team B Score */}
        <div
          className={[
            styles.teamScore,
            !isTeamAServing ? styles.servingB : "",
            advantageTeam === "B" ? styles.advantage : "",
          ].join(" ")}
        >
          <div className={styles.teamInfo}>
            <div className={styles.teamNameB}>{matchMeta.teamBName}</div>
            <div className={styles.score}>{teamBScore}点</div>
            <div className={styles.games}>{teamBGames}ゲーム</div>
            <div className={styles.players}>
              <div
                className={[
                  styles.player,
                  currentServer === "B1" ? styles.serverNameB : "",
                ].join(" ")}
              >
                {matchMeta.playerB1Name}{" "}
                {currentServer === "B1" && (
                  <span className={styles.serverNameB}>(サーブ)</span>
                )}
              </div>
              <div
                className={[
                  styles.player,
                  currentServer === "B2" ? styles.serverNameB : "",
                ].join(" ")}
              >
                {matchMeta.playerB2Name}{" "}
                {currentServer === "B2" && (
                  <span className={styles.serverNameB}>(サーブ)</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ゲーム状況・サーバー名（元のまま下部に配置） */}
      <div className={styles.status}>
        <div>
          現在の状況：
          {isDeuce
            ? "デュース"
            : isAdvantage
            ? `アドバンテージ ${
                advantageTeam === "A"
                  ? matchMeta.teamAName
                  : matchMeta.teamBName
              }`
            : `第${currentGame}ゲーム`}
        </div>
        <div>
          サーバー:{" "}
          <span className={styles.serverName}>{currentServerName}</span>
        </div>
      </div>
    </div>
  );
};
