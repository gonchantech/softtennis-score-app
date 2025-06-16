import { createNewPointEntry } from "../create-new-point-entry";
import { MatchState } from "@/context/match-state";
import { RawPointInput, Player } from "@/types";

describe("createNewPointEntry", () => {
  const mockPrevState: MatchState = {
    points: [
      {
        server: "A1" as Player,
        firstServeIn: true,
        rallyLength: "short",
        player: "A1" as Player,
        playType: "forehandstroke",
        ballCourse: "cross",
        timestamp: 1000,
        teamAGames: 0,
        teamBGames: 0,
        teamAScore: 0,
        teamBScore: 0,
        gameNumber: 1,
      },
    ],
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
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-01-01"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should create new point entry with correct data", () => {
    const result = createNewPointEntry({
      prevState: mockPrevState,
      pointData: mockPointData,
      teamAGames: 1,
      teamBGames: 0,
      teamAScore: 1,
      teamBScore: 0,
      gameNumber: 1,
    });

    expect(result).toHaveLength(2);
    expect(result[1]).toEqual({
      ...mockPointData,
      timestamp: new Date("2024-01-01").getTime(),
      teamAGames: 1,
      teamBGames: 0,
      teamAScore: 1,
      teamBScore: 0,
      gameNumber: 1,
    });
  });

  it("should preserve previous points", () => {
    const result = createNewPointEntry({
      prevState: mockPrevState,
      pointData: mockPointData,
      teamAGames: 1,
      teamBGames: 0,
      teamAScore: 1,
      teamBScore: 0,
      gameNumber: 1,
    });

    expect(result[0]).toEqual(mockPrevState.points[0]);
  });
});
