import { MatchState } from "@/context/match-state";
import { RawPointInput, Player } from "@/types";
import { calculateNewScore } from "./calculate-new-score";
import { checkIsGameComplete } from "./check-is-game-complete";
import { checkIsMatchComplete } from "./check-is-match-complete";
import { handleGameComplete } from "./handle-game/handle-game-complete";
import { handleGameInProgress } from "./handle-game/handleGameInProgress";

type AddPointProps = {
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
  matchLength: number;
};

export function addPoint({
  calculateNewServerWhenGameNotFinished,
  pointLength,
  prevState,
  pointData,
  matchLength,
}: AddPointProps): MatchState {
  const { newTeamAScore, newTeamBScore } = calculateNewScore({
    prevTeamAScore: prevState.teamAScore,
    prevTeamBScore: prevState.teamBScore,
    pointData,
  });

  const { newTeamAGames, newTeamBGames, newIsGameComplete } =
    checkIsGameComplete({
      pointLength,
      prevIsDeuce: prevState.isDeuce,
      prevIsAdvantage: prevState.isAdvantage,
      prevTeamAGames: prevState.teamAGames,
      prevTeamBGames: prevState.teamBGames,
      newTeamAScore,
      newTeamBScore,
    });

  const { newIsMatchComplete } = checkIsMatchComplete({
    newIsGameComplete,
    newTeamAGames,
    newTeamBGames,
    matchLength,
  });

  if (newIsGameComplete) {
    return handleGameComplete({
      prevState,
      pointData,
      newTeamAGames,
      newTeamBGames,
      newIsMatchComplete,
    });
  } else {
    return handleGameInProgress({
      calculateNewServerWhenGameNotFinished,
      pointLength,
      prevState,
      pointData,
      newTeamAScore,
      newTeamBScore,
    });
  }
}
