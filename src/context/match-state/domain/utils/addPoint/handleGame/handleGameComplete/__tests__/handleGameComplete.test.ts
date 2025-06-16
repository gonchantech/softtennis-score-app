import { handleGameComplete } from "../handleGameComplete";
import { MatchState, RawPointInput } from "@/features/match";
import { Player } from "@/features/match/types/player";
import { changeStateAfterGameComplete } from "../changeStateAfterGameComplete";
import { createNewPointEntry } from "../../createNewPointEntry";

jest.mock("../changeStateAfterGameComplete");
jest.mock("../../createNewPointEntry");

describe("handleGameComplete", () => {
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

  beforeEach(() => {
    jest.clearAllMocks();
    (changeStateAfterGameComplete as jest.Mock).mockReturnValue({
      newCurrentGame: 2,
      newTeamAScore: 0,
      newTeamBScore: 0,
      newIsDeuce: false,
      newIsAdvantage: false,
      newAdvantageTeam: undefined,
      newCurrentServerTeam: "B",
      newCurrentServer: "B1",
      newServesLeft: 2,
    });
    (createNewPointEntry as jest.Mock).mockReturnValue([]);
  });

  it("should call all required functions with correct arguments", () => {
    handleGameComplete({
      prevState: mockPrevState,
      pointData: mockPointData,
      newTeamAGames: 1,
      newTeamBGames: 0,
      newIsMatchComplete: false,
    });

    expect(changeStateAfterGameComplete).toHaveBeenCalledWith(
      mockPrevState.currentGame,
      mockPrevState.currentServerTeam
    );

    expect(createNewPointEntry).toHaveBeenCalledWith({
      prevState: mockPrevState,
      pointData: mockPointData,
      teamAGames: 1,
      teamBGames: 0,
      teamAScore: 0,
      teamBScore: 0,
      gameNumber: 2,
    });
  });
});
