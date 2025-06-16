import { MatchState } from "@/context/match-state";
import { PointData, RawPointInput } from "@/types";

type CreateNewPointEntryProps = {
  prevState: MatchState;
  pointData: RawPointInput;
  teamAGames: number;
  teamBGames: number;
  teamAScore: number;
  teamBScore: number;
  gameNumber: number;
};

export function createNewPointEntry({
  prevState,
  pointData,
  teamAGames,
  teamBGames,
  teamAScore,
  teamBScore,
  gameNumber,
}: CreateNewPointEntryProps): PointData[] {
  return [
    ...prevState.points,
    {
      ...pointData,
      timestamp: Date.now(),
      teamAGames,
      teamBGames,
      teamAScore,
      teamBScore,
      gameNumber,
    },
  ];
}
