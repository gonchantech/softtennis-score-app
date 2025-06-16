import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { MatchMeta } from "@/context/match-meta/types";
import { PointData } from "@/types";

export type MatchResult = {
  meta: MatchMeta;
  points: PointData[];
};

type GetMatchParams = {
  matchId: string;
};

export const getMatch = async ({
  matchId,
}: GetMatchParams): Promise<MatchResult> => {
  const supabase = createClient();

  // match_metaの取得
  const { data: matchMeta, error: matchMetaError } = await supabase
    .from("match_meta")
    .select("*")
    .eq("id", matchId)
    .single();

  if (matchMetaError) throw matchMetaError;
  if (!matchMeta) throw new Error("試合が見つかりません");

  // pointsの取得
  const { data: points, error: pointsError } = await supabase
    .from("point")
    .select("*")
    .eq("match_id", matchId)
    .order("created_at", { ascending: true });

  if (pointsError) throw pointsError;

  return {
    meta: matchMeta,
    points: points || [],
  };
};

export const useMatch = ({ matchId }: GetMatchParams) => {
  const { data, isLoading } = useQuery({
    queryKey: ["match", matchId],
    queryFn: () => getMatch({ matchId }),
    enabled: !!matchId,
  });

  return {
    data,
    isLoading,
  };
};
