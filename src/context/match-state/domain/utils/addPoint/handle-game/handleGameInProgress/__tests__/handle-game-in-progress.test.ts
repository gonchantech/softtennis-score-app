import {
  handleGameInProgress,
  HandleGameInProgressProps,
} from "../handle-game-in-progress";
import { MatchState } from "@/context/match-state";
import { RawPointInput, Player } from "@/types";
import { checkIsDeuceWhenGameNotFinished } from "../check-is-deuce-when-game-not-finished";
import { checkIsAdvantageWhenGameNotFinished } from "../check-is-advantage";
import { createNewPointEntry } from "../../create-new-point-entry";

jest.mock("../checkIsDeuceWhenGameNotFinished");
jest.mock("../checkIsAdvantage");
jest.mock("../../createNewPointEntry");

describe("handleGameInProgress", () => {
  const mockPrevState: MatchState = {
    points: [],
    teamAScore: 0,
    teamBScore: 0,
    teamAGames: 0,
    teamBGames: 0,
    isDeuce: false,
    isAdvantage: false,
    isGameComplete: false,
    isMatchComplete: false,
    currentServer: "A1" as Player,
    currentServerTeam: "A",
    servesLeft: 2,
    currentGame: 1,
  };

  const mockPointData: RawPointInput = {
    server: "A1" as Player,
    firstServeIn: true,
    rallyLength: "short",
    player: "A1" as Player,
    playType: "forehandstroke",
    ballCourse: "cross",
  };

  const mockProps: HandleGameInProgressProps = {
    prevState: mockPrevState,
    pointData: mockPointData,
    newTeamAScore: 1,
    newTeamBScore: 0,
    pointLength: 4,
    calculateNewServerWhenGameNotFinished: () => ({
      newCurrentServer: "A1" as Player,
      newServesLeft: 2,
    }),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (checkIsDeuceWhenGameNotFinished as jest.Mock).mockReturnValue({
      newIsDeuce: false,
    });
    (checkIsAdvantageWhenGameNotFinished as jest.Mock).mockReturnValue({
      newIsAdvantage: false,
      newAdvantageTeam: undefined,
    });
    (createNewPointEntry as jest.Mock).mockReturnValue([]);
  });

  it("should call all required functions with correct arguments", () => {
    handleGameInProgress(mockProps);

    expect(checkIsDeuceWhenGameNotFinished).toHaveBeenCalledWith({
      pointLength: 4,
      newTeamAScore: 1,
      newTeamBScore: 0,
    });

    expect(checkIsAdvantageWhenGameNotFinished).toHaveBeenCalledWith({
      isPrevDeuce: mockPrevState.isDeuce,
      newTeamAScore: 1,
      newTeamBScore: 0,
    });

    expect(createNewPointEntry).toHaveBeenCalledWith({
      prevState: mockPrevState,
      pointData: mockPointData,
      teamAGames: mockPrevState.teamAGames,
      teamBGames: mockPrevState.teamBGames,
      teamAScore: 1,
      teamBScore: 0,
      gameNumber: mockPrevState.currentGame,
    });
  });
});
