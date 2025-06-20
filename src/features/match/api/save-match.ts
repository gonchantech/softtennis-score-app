import { useMutation } from "@tanstack/react-query";

import { createClient } from "@/lib/supabase/client";
import { queryClient } from "@/lib/reactQuery";
import { Match } from "@/types";

type SaveMatchParams = {
  match: Match;
};

const getErrorMessage = (error: Error): string => {
  const message = error.message.toLowerCase();
  if (message.includes("auth")) {
    return "ログインが必要です";
  }
  if (message.includes("match_meta")) {
    return "試合データの保存に失敗しました";
  }
  if (message.includes("point")) {
    return "ポイントデータの保存に失敗しました";
  }
  return "データの保存に失敗しました。しばらく経ってから再度お試しください";
};

export const saveMatch = async ({ match }: SaveMatchParams) => {
  const supabase = createClient();

  // 現在のユーザーを取得
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) throw new Error(getErrorMessage(userError));
  if (!user) throw new Error("ログインが必要です");

  // match_metaを保存
  const { data: matchMeta, error: matchMetaError } = await supabase
    .from("match_meta")
    .insert({
      match_length: match.matchMeta.matchLength,
      team_A_name: match.matchMeta.teamAName,
      team_B_name: match.matchMeta.teamBName,
      player_A1_name: match.matchMeta.playerA1Name,
      player_A2_name: match.matchMeta.playerA2Name,
      player_B1_name: match.matchMeta.playerB1Name,
      player_B2_name: match.matchMeta.playerB2Name,
      initial_server: match.matchMeta.initialServer,
      team_A_games: match.points[match.points.length - 1].teamAGames,
      team_B_games: match.points[match.points.length - 1].teamBGames,
      user_id: user.id,
    })
    .select()
    .single();

  if (matchMetaError) throw new Error(getErrorMessage(matchMetaError));
  if (!matchMeta) throw new Error("試合データの保存に失敗しました");

  // pointsを保存
  if (match.points.length > 0) {
    const { error: pointsError } = await supabase.from("point").insert(
      match.points.map((point) => ({
        server: point.server,
        timestamp: point.timestamp,
        first_serve_in: point.firstServeIn,
        rally_length: point.rallyLength,
        player: point.player,
        play_type: point.playType,
        ball_course: point.ballCourse,
        error_course: point.errorCause,
        game_number: point.gameNumber,
        team_A_score: point.teamAScore,
        team_B_score: point.teamBScore,
        team_A_games: point.teamAGames,
        team_B_games: point.teamBGames,
        match_id: matchMeta.id,
      }))
    );

    if (pointsError) {
      throw new Error(getErrorMessage(pointsError));
    }
  }

  return {
    matchMeta: {
      ...match.matchMeta,
      id: matchMeta.id,
      user_id: user.id,
    },
    points: match.points,
  };
};

type UseSaveMatchParams = {
  onSuccess?: (match: Match) => void;
  onError?: (error: Error) => void;
};

export const useSaveMatch = ({
  onSuccess,
  onError,
}: UseSaveMatchParams = {}) => {
  const { mutate: submit, isPending } = useMutation({
    mutationFn: saveMatch,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });

  return {
    submit,
    isLoading: isPending,
  };
};
