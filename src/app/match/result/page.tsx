"use client";

import { Stack } from "@/components/stack";
import { useMatchMeta } from "@/context/match-meta";
import { useMatchState } from "@/context/match-state";
import {
  useSaveMatch,
  MatchResultComponent,
  MatchStatsComponent,
  PointHistory,
} from "@/features/match";
import { Match } from "@/types";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";

export default function MatchResultPage() {
  const router = useRouter();
  const { state: matchMeta } = useMatchMeta();
  const { state: matchState } = useMatchState();
  const { points } = matchState;
  const saveMatch = useSaveMatch();

  const handleSaveClick = () => {
    try {
      console.log("savingMatch");
      saveMatch.submit({ match });
    } catch (error) {
      console.error(error);
    }
  };

  const handleHomeClick = () => {
    router.push("/");
  };

  const match: Match = {
    matchMeta,
    points,
  };

  return (
    <Stack direction="vertical" gap="md">
      <MatchResultComponent match={match} />
      <MatchStatsComponent match={match} />
      <PointHistory match={match} forResult={true} />
      <Button color="gray" size="md" onClick={handleSaveClick} fullWidth>
        試合を保存する
      </Button>
      <Button color="gray" size="md" onClick={handleHomeClick} fullWidth>
        トップ画面へ戻る
      </Button>
    </Stack>
  );
}
