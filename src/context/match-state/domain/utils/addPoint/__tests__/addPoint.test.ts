import { addPoint } from "../addPoint";
import { MatchState, RawPointInput } from "@/features/match";
import { Player } from "@/features/match/types/player";
import { calculateNewScore } from "../calculateNewScore";
import { checkIsGameComplete } from "../checkIsGameComplete";
import { checkIsMatchComplete } from "../checkIsMatchComplete";
import { handleGameComplete } from "../handleGame/handleGameComplete";
import { handleGameInProgress } from "../handleGame/handleGameInProgress";

jest.mock("../calculateNewScore");
jest.mock("../checkIsGameComplete");
jest.mock("../checkIsMatchComplete");
jest.mock("../handleGame/handleGameComplete");
jest.mock("../handleGame/handleGameInProgress");

describe("addPoint", () => {
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

  const mockCalculateNewServer = () => ({
    newCurrentServer: "A1" as Player,
    newServesLeft: 2,
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (calculateNewScore as jest.Mock).mockReturnValue({
      newTeamAScore: 1,
      newTeamBScore: 0,
    });
    (checkIsGameComplete as jest.Mock).mockReturnValue({
      newTeamAGames: 0,
      newTeamBGames: 0,
      newIsGameComplete: false,
    });
    (checkIsMatchComplete as jest.Mock).mockReturnValue({
      newIsMatchComplete: false,
    });
  });

  it("should call all required functions with correct arguments when game is not complete", () => {
    addPoint({
      calculateNewServerWhenGameNotFinished: mockCalculateNewServer,
      pointLength: 4,
      prevState: mockPrevState,
      pointData: mockPointData,
      matchLength: 5,
    });

    expect(calculateNewScore).toHaveBeenCalledWith({
      prevTeamAScore: mockPrevState.teamAScore,
      prevTeamBScore: mockPrevState.teamBScore,
      pointData: mockPointData,
    });

    expect(checkIsGameComplete).toHaveBeenCalledWith({
      pointLength: 4,
      prevIsDeuce: mockPrevState.isDeuce,
      prevIsAdvantage: mockPrevState.isAdvantage,
      prevTeamAGames: mockPrevState.teamAGames,
      prevTeamBGames: mockPrevState.teamBGames,
      newTeamAScore: 1,
      newTeamBScore: 0,
    });

    expect(checkIsMatchComplete).toHaveBeenCalledWith({
      newIsGameComplete: false,
      newTeamAGames: 0,
      newTeamBGames: 0,
      matchLength: 5,
    });

    expect(handleGameInProgress).toHaveBeenCalledWith({
      calculateNewServerWhenGameNotFinished: mockCalculateNewServer,
      pointLength: 4,
      prevState: mockPrevState,
      pointData: mockPointData,
      newTeamAScore: 1,
      newTeamBScore: 0,
    });
  });

  it("should call handleGameComplete when game is complete", () => {
    (checkIsGameComplete as jest.Mock).mockReturnValue({
      newTeamAGames: 1,
      newTeamBGames: 0,
      newIsGameComplete: true,
    });

    addPoint({
      calculateNewServerWhenGameNotFinished: mockCalculateNewServer,
      pointLength: 4,
      prevState: mockPrevState,
      pointData: mockPointData,
      matchLength: 5,
    });

    expect(handleGameComplete).toHaveBeenCalledWith({
      prevState: mockPrevState,
      pointData: mockPointData,
      newTeamAGames: 1,
      newTeamBGames: 0,
      newIsMatchComplete: false,
    });
  });
});
