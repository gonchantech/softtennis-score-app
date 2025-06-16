"use client";

import { MatchHistory } from "@/features/match";
import { useRouter } from "next/navigation";

export default function MatchHistoryPage() {
  const router = useRouter();

  const onViewDetails = (matchId: string) => {
    router.push(`/match/history/${matchId}`);
  };

  return <MatchHistory onViewDetails={onViewDetails} />;
}
