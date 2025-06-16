"use client";
import styles from "./match-control.module.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMatchMeta } from "@/context/match-meta";
import { useMatchState } from "@/context/match-state";
import { Button } from "@/components/button";
import { Player } from "@/types";
import { Stack } from "@/components/stack";

interface MatchControlsProps {
  setShowCompleteModal: (show: boolean) => void;
}

export const MatchControls: React.FC<MatchControlsProps> = ({
  setShowCompleteModal,
}) => {
  const { state: matchMeta, resetMatchMeta } = useMatchMeta();
  const {
    state: matchState,
    completeMatch,
    resetMatchState,
    changeServer,
  } = useMatchState();
  const [confirmReset, setConfirmReset] = useState(false);
  const [showServerChange, setShowServerChange] = useState(false);
  const router = useRouter();

  // Get player names from state
  const players = {
    A1: { id: "A1" as Player, name: matchMeta.playerA1Name, team: "A" },
    A2: { id: "A2" as Player, name: matchMeta.playerA2Name, team: "A" },
    B1: { id: "B1" as Player, name: matchMeta.playerB1Name, team: "B" },
    B2: { id: "B2" as Player, name: matchMeta.playerB2Name, team: "B" },
  };

  const handleComplete = () => {
    if (matchState.isMatchComplete) {
      setShowCompleteModal(true);
      return;
    }
    completeMatch();
  };

  const handleReset = () => {
    if (confirmReset) {
      resetMatchState();
      setConfirmReset(false);
    } else {
      setConfirmReset(true);
    }
  };

  const handleTop = () => {
    resetMatchMeta();
    resetMatchState();
    router.push("/");
  };

  const handleServerChange = (player: Player) => {
    changeServer(player);
    setShowServerChange(false);
  };

  return (
    <div className={styles.container}>
      <Stack direction="horizontal" gap="md">
        <Button onClick={handleComplete} variant="solid" color="gray" fullWidth>
          試合を終了
        </Button>

        <Button onClick={handleTop} variant="solid" color="gray" fullWidth>
          トップ画面へ戻る
        </Button>

        <Button
          onClick={() => setShowServerChange(true)}
          variant="solid"
          color="gray"
          fullWidth
        >
          サーバーを変更
        </Button>

        <Button
          onClick={handleReset}
          variant="solid"
          color={confirmReset ? "danger" : "gray"}
          fullWidth
        >
          {confirmReset ? "リセットを確認" : "試合をリセット"}
        </Button>
      </Stack>

      {/* Server Change Modal */}
      {showServerChange && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>サーバーを変更</h3>

            <div className={styles.serverButtons}>
              {Object.values(players).map((player) => (
                <Button
                  key={player.id}
                  onClick={() => handleServerChange(player.id)}
                  variant="solid"
                  color={player.team === "A" ? "secondary" : "primary"}
                  fullWidth
                >
                  {player.name} ({player.id})
                </Button>
              ))}
            </div>

            <Button
              onClick={() => setShowServerChange(false)}
              variant="solid"
              color="gray"
              fullWidth
            >
              キャンセル
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
