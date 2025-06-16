"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { MatchResultMeta, MatchLength } from "@/context/match-meta/types";
import { Player } from "@/types";

type MatchMetaRow = {
  id: string;
  user_id: string;
  match_length: MatchLength;
  team_A_name: string;
  team_B_name: string;
  player_A1_name: string;
  player_A2_name: string;
  player_B1_name: string;
  player_B2_name: string;
  initial_server: Player;
  team_A_games: number;
  team_B_games: number;
  created_at: string;
};

const convertToMatchResultMeta = (data: MatchMetaRow): MatchResultMeta => {
  return {
    id: data.id,
    ownerId: data.user_id,
    matchLength: data.match_length,
    teamAName: data.team_A_name,
    teamBName: data.team_B_name,
    playerA1Name: data.player_A1_name,
    playerA2Name: data.player_A2_name,
    playerB1Name: data.player_B1_name,
    playerB2Name: data.player_B2_name,
    initialServer: data.initial_server,
    teamAGames: data.team_A_games,
    teamBGames: data.team_B_games,
    savedAt: new Date(data.created_at),
  };
};

export const getMatches = async (): Promise<MatchResultMeta[]> => {
  const supabase = createClient();

  // 現在のユーザーを取得
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) throw new Error("ログインが必要です");

  // ユーザーIDでmatch_metaを取得
  const { data, error } = await supabase
    .from("match_meta")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  console.log("data", data);

  if (error) throw error;
  return data.map(convertToMatchResultMeta);
};

export const useMatches = () => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: ["matches"],
    queryFn: () => getMatches(),
    initialData: [],
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};
