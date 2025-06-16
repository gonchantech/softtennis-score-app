import { RegularGame } from "../regular-game";
import { RawPointInput, Player } from "@/types";
import { MatchState } from "../../types";

describe("RegularGame", () => {
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

  describe("addPoint", () => {
    it("should handle normal point progression", () => {
      const result = RegularGame.addPoint({
        prevState: mockPrevState,
        pointData: mockPointData,
        matchLength: 5,
      });

      expect(result).toEqual({
        ...mockPrevState,
        teamAScore: 1,
        teamBScore: 0,
        servesLeft: 1,
        points: [
          {
            ...mockPointData,
            timestamp: expect.any(Number),
            teamAGames: 0,
            teamBGames: 0,
            teamAScore: 1,
            teamBScore: 0,
            gameNumber: 1,
          },
        ],
      });
    });

    it("should handle server change when serves are exhausted", () => {
      const stateWithOneServeLeft = {
        ...mockPrevState,
        servesLeft: 1,
      };

      const result = RegularGame.addPoint({
        prevState: stateWithOneServeLeft,
        pointData: mockPointData,
        matchLength: 5,
      });

      expect(result.servesLeft).toBe(2);
      expect(result.currentServer).toBe("A2");
    });

    it("should handle game completion", () => {
      const stateWithThreePoints = {
        ...mockPrevState,
        teamAScore: 3,
        teamBScore: 0,
      };

      const result = RegularGame.addPoint({
        prevState: stateWithThreePoints,
        pointData: mockPointData,
        matchLength: 5,
      });

      expect(result).toEqual({
        ...mockPrevState,
        teamAScore: 0,
        teamBScore: 0,
        teamAGames: 1,
        teamBGames: 0,
        currentGame: 2,
        currentServer: "B1",
        currentServerTeam: "B",
        servesLeft: 2,
        isGameComplete: true,
        points: [
          {
            ...mockPointData,
            timestamp: expect.any(Number),
            teamAGames: 1,
            teamBGames: 0,
            teamAScore: 0,
            teamBScore: 0,
            gameNumber: 2,
          },
        ],
      });
    });

    it("should handle deuce", () => {
      const stateWithThreePointsEach = {
        ...mockPrevState,
        isDeuce: true,
        teamAScore: 3,
        teamBScore: 3,
      };

      const result = RegularGame.addPoint({
        prevState: stateWithThreePointsEach,
        pointData: mockPointData,
        matchLength: 5,
      });

      expect(result.isDeuce).toBe(true);
    });
  });
});
