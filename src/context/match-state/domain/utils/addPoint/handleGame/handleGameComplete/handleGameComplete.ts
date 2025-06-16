import { MatchState, RawPointInput } from "@/features/match";
import { changeStateAfterGameComplete } from "./changeStateAfterGameComplete";
import { createNewPointEntry } from "../createNewPointEntry";

type HandleGameCompleteProps = {
  prevState: MatchState;
  pointData: RawPointInput;
  newTeamAGames: number;
  newTeamBGames: number;
  newIsMatchComplete: boolean;
};

export function handleGameComplete({
  prevState,
  pointData,
  newTeamAGames,
  newTeamBGames,
  newIsMatchComplete,
}: HandleGameCompleteProps): MatchState {
  const {
    newCurrentGame,
    newTeamAScore,
    newTeamBScore,
    newIsDeuce,
    newIsAdvantage,
    newAdvantageTeam,
    newCurrentServerTeam,
    newCurrentServer,
    newServesLeft,
  } = changeStateAfterGameComplete(
    prevState.currentGame,
    prevState.currentServerTeam
  );

  const newPoints = createNewPointEntry({
    prevState,
    pointData,
    teamAGames: newTeamAGames,
    teamBGames: newTeamBGames,
    teamAScore: newTeamAScore,
    teamBScore: newTeamBScore,
    gameNumber: newCurrentGame,
  });

  return {
    teamAScore: newTeamAScore,
    teamBScore: newTeamBScore,
    teamAGames: newTeamAGames,
    teamBGames: newTeamBGames,
    currentServerTeam: newCurrentServerTeam,
    currentServer: newCurrentServer,
    servesLeft: newServesLeft,
    isDeuce: newIsDeuce,
    isAdvantage: newIsAdvantage,
    advantageTeam: newAdvantageTeam,
    currentGame: newCurrentGame,
    points: newPoints,
    isMatchComplete: newIsMatchComplete,
    isGameComplete: true,
  };
}
