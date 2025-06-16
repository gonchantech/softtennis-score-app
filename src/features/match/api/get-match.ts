import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { MatchMeta, MatchLength } from "@/context/match-meta/types";
import {
  PointData,
  Player,
  RallyLength,
  PlayType,
  BallCourse,
  ErrorCause,
} from "@/types";

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

type PointRow = {
  id: string;
  match_id: string;
  server: Player;
  timestamp: number;
  first_serve_in: boolean;
  rally_length: string;
  player: Player;
  play_type: string;
  ball_course: string;
  error_course: string | null;
  game_number: number;
  team_A_score: number;
  team_B_score: number;
  team_A_games: number;
  team_B_games: number;
  created_at: string;
};

const convertToMatchMeta = (data: MatchMetaRow): MatchMeta => {
  return {
    matchLength: data.match_length,
    teamAName: data.team_A_name,
    teamBName: data.team_B_name,
    playerA1Name: data.player_A1_name,
    playerA2Name: data.player_A2_name,
    playerB1Name: data.player_B1_name,
    playerB2Name: data.player_B2_name,
    initialServer: data.initial_server,
  };
};

const convertToPointData = (data: PointRow): PointData => {
  return {
    server: data.server,
    timestamp: data.timestamp,
    firstServeIn: data.first_serve_in,
    rallyLength: data.rally_length as RallyLength,
    player: data.player,
    playType: data.play_type as PlayType,
    ballCourse: data.ball_course as BallCourse,
    errorCause: data.error_course as ErrorCause | undefined,
    gameNumber: data.game_number,
    teamAScore: data.team_A_score,
    teamBScore: data.team_B_score,
    teamAGames: data.team_A_games,
    teamBGames: data.team_B_games,
  };
};

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

  try {
    console.log("Fetching match with ID:", matchId);

    // match_metaの取得
    const { data: matchMeta, error: matchMetaError } = await supabase
      .from("match_meta")
      .select("*")
      .eq("id", matchId)
      .single();

    if (matchMetaError) {
      console.error("Match meta error:", matchMetaError);
      throw matchMetaError;
    }
    if (!matchMeta) {
      console.error("Match not found for ID:", matchId);
      throw new Error("試合が見つかりません");
    }

    console.log("Match meta found:", matchMeta);

    // pointsの取得
    const { data: points, error: pointsError } = await supabase
      .from("point")
      .select("*")
      .eq("match_id", matchId)
      .order("timestamp", { ascending: true });

    if (pointsError) {
      console.error("Points error:", pointsError);
      throw pointsError;
    }

    console.log("Points found:", points?.length || 0);

    return {
      meta: convertToMatchMeta(matchMeta),
      points: (points || []).map(convertToPointData),
    };
  } catch (error) {
    console.error("Error in getMatch:", error);
    throw error;
  }
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
