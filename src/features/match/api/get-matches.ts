"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { MatchResultMeta } from "@/context/match-meta/types";

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

  if (error) throw error;
  return data;
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
