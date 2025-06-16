"use client";

import { useParams, useRouter } from "next/navigation";
import {
  MatchResultComponent,
  MatchStatsComponent,
  useMatch,
  PointHistory,
} from "@/features/match";
import { Button } from "@/components/button";
import { Stack } from "@/components/stack";
import { Match } from "@/types";

const MatchResultPage = () => {
  const { matchId } = useParams();
  const router = useRouter();
  const { data } = useMatch({ matchId: matchId as string });

  if (!data) {
    return <div>Match not found</div>;
  }

  const { meta, points } = data;

  const match: Match = {
    matchMeta: meta,
    points,
  };

  const handleClick = () => {
    router.push("/match/history");
  };

  return (
    <Stack direction="vertical" gap="md">
      <MatchResultComponent match={match} />
      <MatchStatsComponent match={match} />
      <PointHistory forResult={true} match={match} />
      <Button color="gray" size="md" onClick={handleClick} fullWidth>
        一覧へ戻る
      </Button>
    </Stack>
  );
};

export default MatchResultPage;
