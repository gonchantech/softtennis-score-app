import { checkIsGameComplete } from "../checkIsGameComplete";

describe("checkIsGameComplete", () => {
  describe("Normal game completion", () => {
    it("should complete game when team A reaches 4 points", () => {
      const result = checkIsGameComplete({
        pointLength: 4,
        prevIsDeuce: false,
        prevIsAdvantage: false,
        prevTeamAGames: 0,
        prevTeamBGames: 0,
        newTeamAScore: 4,
        newTeamBScore: 2,
      });

      expect(result).toEqual({
        newTeamAGames: 1,
        newTeamBGames: 0,
        newIsGameComplete: true,
      });
    });

    it("should complete game when team B reaches 4 points", () => {
      const result = checkIsGameComplete({
        pointLength: 4,
        prevIsDeuce: false,
        prevIsAdvantage: false,
        prevTeamAGames: 0,
        prevTeamBGames: 0,
        newTeamAScore: 2,
        newTeamBScore: 4,
      });

      expect(result).toEqual({
        newTeamAGames: 0,
        newTeamBGames: 1,
        newIsGameComplete: true,
      });
    });
  });

  describe("Game completion after deuce", () => {
    it("should complete game when team A wins after advantage", () => {
      const result = checkIsGameComplete({
        pointLength: 4,
        prevIsDeuce: true,
        prevIsAdvantage: true,
        prevTeamAGames: 0,
        prevTeamBGames: 0,
        newTeamAScore: 5,
        newTeamBScore: 4,
      });

      expect(result).toEqual({
        newTeamAGames: 1,
        newTeamBGames: 0,
        newIsGameComplete: true,
      });
    });

    it("should complete game when team B wins after advantage", () => {
      const result = checkIsGameComplete({
        pointLength: 4,
        prevIsDeuce: true,
        prevIsAdvantage: true,
        prevTeamAGames: 0,
        prevTeamBGames: 0,
        newTeamAScore: 4,
        newTeamBScore: 5,
      });

      expect(result).toEqual({
        newTeamAGames: 0,
        newTeamBGames: 1,
        newIsGameComplete: true,
      });
    });
  });

  describe("Game continuation", () => {
    it("should not complete game when scores are not enough", () => {
      const result = checkIsGameComplete({
        pointLength: 4,
        prevIsDeuce: false,
        prevIsAdvantage: false,
        prevTeamAGames: 0,
        prevTeamBGames: 0,
        newTeamAScore: 3,
        newTeamBScore: 3,
      });

      expect(result).toEqual({
        newTeamAGames: 0,
        newTeamBGames: 0,
        newIsGameComplete: false,
      });
    });

    it("should not complete game when scores are equal in deuce", () => {
      const result = checkIsGameComplete({
        pointLength: 4,
        prevIsDeuce: true,
        prevIsAdvantage: false,
        prevTeamAGames: 0,
        prevTeamBGames: 0,
        newTeamAScore: 4,
        newTeamBScore: 4,
      });

      expect(result).toEqual({
        newTeamAGames: 0,
        newTeamBGames: 0,
        newIsGameComplete: false,
      });
    });
  });
});
