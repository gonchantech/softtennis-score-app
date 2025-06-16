"use client";
import styles from "./match-setup-form.module.css";
import { useState } from "react";
import { useMatchMeta, MatchLength } from "@/context/match-meta";
import { useMatchState } from "@/context/match-state";
import { Button } from "@/components/button";
import { Player } from "@/types";
import { MatchFormatSelector } from "./match-format-selector";
import { ServerSelector } from "./server-selector";
import { TeamSetup } from "./team-setup";

export type MatchSetupProps = {
  onSubmit: () => void;
};

export const MatchSetupForm: React.FC<MatchSetupProps> = ({ onSubmit }) => {
  const { setupMatchMeta } = useMatchMeta();
  const { resetMatchState, changeServer } = useMatchState();
  const [matchLength, setMatchLength] = useState<MatchLength>(5);
  const [teamAName, setTeamAName] = useState("チームA");
  const [teamBName, setTeamBName] = useState("チームB");
  const [playerA1Name, setPlayerA1Name] = useState("選手A1");
  const [playerA2Name, setPlayerA2Name] = useState("選手A2");
  const [playerB1Name, setPlayerB1Name] = useState("選手B1");
  const [playerB2Name, setPlayerB2Name] = useState("選手B2");
  const [initialServer, setInitialServer] = useState<Player>("A1");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setupMatchMeta({
      matchLength,
      teamAName,
      teamBName,
      playerA1Name,
      playerA2Name,
      playerB1Name,
      playerB2Name,
      initialServer,
    });
    resetMatchState();
    onSubmit();
    changeServer(initialServer);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>試合設定</h2>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <MatchFormatSelector
          matchLength={matchLength}
          onMatchLengthChange={setMatchLength}
        />
        <TeamSetup
          teamAName={teamAName}
          teamBName={teamBName}
          playerA1Name={playerA1Name}
          playerA2Name={playerA2Name}
          playerB1Name={playerB1Name}
          playerB2Name={playerB2Name}
          onTeamANameChange={setTeamAName}
          onTeamBNameChange={setTeamBName}
          onPlayerA1NameChange={setPlayerA1Name}
          onPlayerA2NameChange={setPlayerA2Name}
          onPlayerB1NameChange={setPlayerB1Name}
          onPlayerB2NameChange={setPlayerB2Name}
        />
        <ServerSelector
          initialServer={initialServer}
          onInitialServerChange={setInitialServer}
          playerA1Name={playerA1Name}
          playerA2Name={playerA2Name}
          playerB1Name={playerB1Name}
          playerB2Name={playerB2Name}
        />

        <Button type="submit" variant="solid" color="primary">
          試合開始
        </Button>
      </form>
    </div>
  );
};
