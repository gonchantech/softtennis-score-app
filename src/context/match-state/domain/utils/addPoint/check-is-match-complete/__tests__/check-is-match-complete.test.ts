import { checkIsMatchComplete } from "../check-is-match-complete";

describe("checkIsMatchComplete", () => {
  describe("Match completion", () => {
    it("should complete match when team A wins required games", () => {
      const result = checkIsMatchComplete({
        newIsGameComplete: true,
        newTeamAGames: 3,
        newTeamBGames: 1,
        matchLength: 5,
      });

      expect(result).toEqual({
        newIsMatchComplete: true,
      });
    });

    it("should complete match when team B wins required games", () => {
      const result = checkIsMatchComplete({
        newIsGameComplete: true,
        newTeamAGames: 1,
        newTeamBGames: 3,
        matchLength: 5,
      });

      expect(result).toEqual({
        newIsMatchComplete: true,
      });
    });
  });

  describe("Match continuation", () => {
    it("should not complete match when game is not complete", () => {
      const result = checkIsMatchComplete({
        newIsGameComplete: false,
        newTeamAGames: 2,
        newTeamBGames: 1,
        matchLength: 5,
      });

      expect(result).toEqual({
        newIsMatchComplete: false,
      });
    });

    it("should not complete match when neither team has won enough games", () => {
      const result = checkIsMatchComplete({
        newIsGameComplete: true,
        newTeamAGames: 2,
        newTeamBGames: 2,
        matchLength: 5,
      });

      expect(result).toEqual({
        newIsMatchComplete: false,
      });
    });
  });
});
