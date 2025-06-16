import { useMutation } from "@tanstack/react-query";

import { createClient } from "@/lib/supabase/client";
import { queryClient } from "@/lib/reactQuery";
import { Match } from "@/types";

type SaveMatchParams = {
  match: Match;
};

export const saveMatch = async ({ match }: SaveMatchParams) => {
  const supabase = createClient();

  // 現在のユーザーを取得
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) throw new Error("ログインが必要です");

  // match_metaを保存
  const { data: matchMeta, error: matchMetaError } = await supabase
    .from("match_meta")
    .insert({
      ...match.matchMeta,
      user_id: user.id,
    })
    .select()
    .single();

  if (matchMetaError) throw matchMetaError;
  if (!matchMeta) throw new Error("試合データの保存に失敗しました");

  // pointsを保存
  if (match.points.length > 0) {
    const { error: pointsError } = await supabase.from("point").insert(
      match.points.map((point) => ({
        ...point,
        match_id: matchMeta.id,
      }))
    );

    if (pointsError) throw pointsError;
  }

  return {
    matchMeta: matchMeta,
    points: match.points,
  };
};

type UseSaveMatchParams = {
  onSuccess?: (match: Match) => void;
};

export const useSaveMatch = ({ onSuccess }: UseSaveMatchParams = {}) => {
  const { mutate: submit, isPending } = useMutation({
    mutationFn: saveMatch,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
      onSuccess?.(data);
    },
  });

  return {
    submit,
    isLoading: isPending,
  };
};
