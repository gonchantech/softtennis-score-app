import { MatchState } from "@/context/match-state";
import { RawPointInput, Player } from "@/types";
import { checkIsDeuceWhenGameNotFinished } from "./check-is-deuce-when-game-not-finished";
import { checkIsAdvantageWhenGameNotFinished } from "./check-is-advantage";
import { createNewPointEntry } from "../create-new-point-entry";

export type HandleGameInProgressProps = {
  calculateNewServerWhenGameNotFinished: (
    prevServesLeft: number,
    prevCurrentServerTeam: "A" | "B",
    prevCurrentServer: Player
  ) => {
    newCurrentServer: Player;
    newServesLeft: number;
  };
  pointLength: 4 | 7;
  prevState: MatchState;
  pointData: RawPointInput;
  newTeamAScore: number;
  newTeamBScore: number;
};
export function handleGameInProgress({
  calculateNewServerWhenGameNotFinished,
  prevState,
  pointData,
  newTeamAScore,
  newTeamBScore,
  pointLength,
}: HandleGameInProgressProps): MatchState {
  const { newCurrentServer, newServesLeft } =
    calculateNewServerWhenGameNotFinished(
      prevState.servesLeft,
      prevState.currentServerTeam,
      prevState.currentServer
    );

  const { newIsDeuce } = checkIsDeuceWhenGameNotFinished({
    pointLength,
    newTeamAScore,
    newTeamBScore,
  });

  const { newIsAdvantage, newAdvantageTeam } =
    checkIsAdvantageWhenGameNotFinished({
      isPrevDeuce: prevState.isDeuce,
      newTeamAScore,
      newTeamBScore,
    });

  const newPoints = createNewPointEntry({
    prevState,
    pointData,
    teamAGames: prevState.teamAGames,
    teamBGames: prevState.teamBGames,
    teamAScore: newTeamAScore,
    teamBScore: newTeamBScore,
    gameNumber: prevState.currentGame,
  });

  return {
    teamAScore: newTeamAScore,
    teamBScore: newTeamBScore,
    teamAGames: prevState.teamAGames,
    teamBGames: prevState.teamBGames,
    currentServerTeam: prevState.currentServerTeam,
    currentServer: newCurrentServer,
    servesLeft: newServesLeft,
    isDeuce: newIsDeuce,
    isAdvantage: newIsAdvantage,
    advantageTeam: newAdvantageTeam as "A" | "B" | undefined,
    currentGame: prevState.currentGame,
    points: newPoints,
    isMatchComplete: prevState.isMatchComplete,
    isGameComplete: false,
  };
}
