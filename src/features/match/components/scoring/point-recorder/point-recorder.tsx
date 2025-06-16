"use client";
import styles from "./point-recorder.module.css";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/button";
import { ToggleButton } from "@/components/toggle-button";
import { Dropdown } from "@/components/dropdown";
import { MatchMeta, MatchLength } from "@/context/match-meta";
import { MatchState } from "@/context/match-state";
import {
  BallCourse,
  ErrorCause,
  RallyLength,
  Player,
  PlayType,
  playTypeDescriptions,
  RawPointInput,
} from "@/types";

interface PointRecorderProps {
  setShowErrorModal: (show: boolean) => void;
  setShowCompleteModal: (show: boolean) => void;
  matchMeta: MatchMeta;
  matchState: MatchState;
  addPoint: (
    pointData: RawPointInput,
    matchLength: MatchLength,
    initialServer: Player
  ) => void;
}

export const PointRecorder: React.FC<PointRecorderProps> = ({
  matchMeta,
  matchState,
  addPoint,
  setShowErrorModal,
  setShowCompleteModal,
}) => {
  const { playerA1Name, playerA2Name, playerB1Name, playerB2Name } = matchMeta;

  // Form state
  const [firstServeIn, setFirstServeIn] = useState<boolean>(true);
  const [rallyLength, setRallyLength] = useState<RallyLength>("short");
  const [player, setPlayer] = useState<Player>("A1");
  const [playType, setPlayType] = useState<PlayType>("forehandstroke");
  const [ballCourse, setBallCourse] = useState<BallCourse>("cross");
  const [isError, setIsError] = useState<boolean>(false);
  const [errorCause, setErrorCause] = useState<ErrorCause>("side_out");

  const playerNameMap = {
    A1: playerA1Name,
    A2: playerA2Name,
    B1: playerB1Name,
    B2: playerB2Name,
  };

  const errorCauseDescriptions: Record<ErrorCause, string> = {
    side_out: "サイドアウト",
    back_out: "バックアウト",
    net: "ネット",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (matchState.isMatchComplete) {
      setShowErrorModal(true);
      return;
    }

    const pointData = {
      server: matchState.currentServer,
      firstServeIn,
      rallyLength,
      player,
      playType,
      ballCourse,
      errorCause: isError ? errorCause : undefined,
    };

    addPoint(pointData, matchMeta.matchLength, matchMeta.initialServer);

    // Reset form
    setFirstServeIn(true);
    setRallyLength("short");
    setIsError(false);
  };

  // チームAの選手かどうかを判定する関数
  const isTeamAPlayer = (playerId: Player) => {
    return playerId === "A1" || playerId === "A2";
  };

  useEffect(() => {
    if (matchState.isMatchComplete) {
      setShowCompleteModal(true);
    }

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [matchState.isMatchComplete]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>ポイント記録</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>ファーストサーブ</label>
          <ToggleButton
            value={firstServeIn}
            onChange={setFirstServeIn}
            trueLabel="イン"
            falseLabel="フォルト"
            trueVariant="success"
            falseVariant="danger"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>ラリー長</label>
          <ToggleButton
            value={rallyLength === "short"}
            onChange={(value) => setRallyLength(value ? "short" : "long")}
            trueLabel="4本以内"
            falseLabel="5本以上"
            trueVariant="primary"
            falseVariant="primary"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>最終ショット選手</label>
          <div className={styles.playerButtons}>
            {Object.entries(playerNameMap).map(([playerId, name]) => (
              <Button
                key={playerId}
                variant="solid"
                color={
                  player === playerId
                    ? isTeamAPlayer(playerId as Player)
                      ? "secondary"
                      : "primary"
                    : "gray"
                }
                onClick={() => setPlayer(playerId as Player)}
                type="button"
                fullWidth
              >
                {name}
              </Button>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>ショット種類</label>
          <Dropdown
            value={playType}
            onChange={(value) => setPlayType(value as PlayType)}
            options={Object.entries(playTypeDescriptions).map(
              ([key, description]) => ({
                value: key,
                label: `${description}`,
              })
            )}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>ボールコース</label>
          <ToggleButton
            value={ballCourse === "cross"}
            onChange={(value) => setBallCourse(value ? "cross" : "straight")}
            trueLabel="クロス"
            falseLabel="ストレート"
            trueVariant="primary"
            falseVariant="primary"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>結果</label>
          <ToggleButton
            value={!isError}
            onChange={(value) => setIsError(!value)}
            trueLabel="得点"
            falseLabel="ミス"
            trueVariant="success"
            falseVariant="danger"
          />
        </div>

        {isError && (
          <div className={styles.formGroup}>
            <label className={styles.label}>ミスの種類</label>
            <div className={styles.errorButtons}>
              {Object.entries(errorCauseDescriptions).map(
                ([key, description]) => (
                  <Button
                    key={key}
                    variant="solid"
                    color={errorCause === key ? "danger" : "gray"}
                    onClick={() => setErrorCause(key as ErrorCause)}
                    type="button"
                    fullWidth
                  >
                    {description}
                  </Button>
                )
              )}
            </div>
          </div>
        )}

        <Button type="submit" variant="solid" color="primary" fullWidth>
          ポイントを記録
        </Button>
      </form>
    </div>
  );
};
