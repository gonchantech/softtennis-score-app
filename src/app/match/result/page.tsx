"use client";

import { Stack } from "@/components/stack";
import { useMatchMeta } from "@/context/match-meta";
import { useMatchState } from "@/context/match-state";
import {
  MatchResultComponent,
  MatchStatsComponent,
  PointHistory,
} from "@/features/match";
import { Match } from "@/types";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";
import { useSaveMatch } from "@/features/match/api/save-match";
import { useNotification } from "@/context/notifications";
import { useState } from "react";

export default function MatchResultPage() {
  const router = useRouter();
  const { state: matchMeta } = useMatchMeta();
  const { state: matchState } = useMatchState();
  const { points } = matchState;
  const { showNotification } = useNotification();
  const [isSaved, setIsSaved] = useState(false);

  const saveMatch = useSaveMatch({
    onSuccess: () => {
      showNotification({
        type: "success",
        title: "保存成功",
        message: "試合データを保存しました",
      });
      setIsSaved(true);
    },
    onError: (error: Error) => {
      showNotification({
        type: "error",
        title: "保存失敗",
        message: `試合データの保存に失敗しました: ${error.message}`,
      });
    },
  });

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
      <Button
        color="gray"
        size="md"
        onClick={handleSaveClick}
        fullWidth
        isLoading={saveMatch.isLoading}
        disabled={isSaved}
      >
        {isSaved ? "保存されました" : "試合を保存する"}
      </Button>
      <Button color="gray" size="md" onClick={handleHomeClick} fullWidth>
        トップ画面へ戻る
      </Button>
    </Stack>
  );
}
