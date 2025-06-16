import { FinalGame } from "../final-game";
import { RawPointInput, Player } from "@/types";
import { MatchState } from "../../types";

describe("FinalGame", () => {
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
      const result = FinalGame.addPoint({
        prevState: mockPrevState,
        pointData: mockPointData,
        matchLength: 5,
        initialServer: "A1" as Player,
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

      const result = FinalGame.addPoint({
        prevState: stateWithOneServeLeft,
        pointData: mockPointData,
        matchLength: 5,
        initialServer: "A1" as Player,
      });

      expect(result.servesLeft).toBe(2);
      expect(result.currentServer).toBe("B1");
    });

    it("should handle game completion", () => {
      const stateWithSixPoints = {
        ...mockPrevState,
        teamAScore: 6,
        teamBScore: 0,
      };

      const result = FinalGame.addPoint({
        prevState: stateWithSixPoints,
        pointData: mockPointData,
        matchLength: 5,
        initialServer: "A1" as Player,
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
      const stateWithSixPointsEach = {
        ...mockPrevState,
        isDeuce: true,
        teamAScore: 6,
        teamBScore: 6,
      };

      const result = FinalGame.addPoint({
        prevState: stateWithSixPointsEach,
        pointData: mockPointData,
        matchLength: 5,
        initialServer: "A1" as Player,
      });

      expect(result.isDeuce).toBe(true);
    });

    it("should handle match completion", () => {
      const stateWithGameAndMatchPoint = {
        ...mockPrevState,
        teamAGames: 2,
        teamBGames: 2,
        teamAScore: 6,
        teamBScore: 0,
      };

      const result = FinalGame.addPoint({
        prevState: stateWithGameAndMatchPoint,
        pointData: mockPointData,
        matchLength: 5,
        initialServer: "A1" as Player,
      });

      expect(result.isMatchComplete).toBe(true);
      expect(result.isGameComplete).toBe(true);
    });
  });
});
