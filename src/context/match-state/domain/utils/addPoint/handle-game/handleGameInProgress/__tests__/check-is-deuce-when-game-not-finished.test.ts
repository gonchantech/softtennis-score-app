import { checkIsDeuceWhenGameNotFinished } from "../check-is-deuce-when-game-not-finished";

describe("checkIsDeuceWhenGameNotFinished", () => {
  describe("when pointLength is 4", () => {
    it("should return deuce when both teams have 3 points", () => {
      const result = checkIsDeuceWhenGameNotFinished({
        pointLength: 4,
        newTeamAScore: 3,
        newTeamBScore: 3,
      });

      expect(result).toEqual({
        newIsDeuce: true,
      });
    });

    it("should not return deuce when one team has less than 3 points", () => {
      const result = checkIsDeuceWhenGameNotFinished({
        pointLength: 4,
        newTeamAScore: 3,
        newTeamBScore: 2,
      });

      expect(result).toEqual({
        newIsDeuce: false,
      });
    });
  });

  describe("when pointLength is 7", () => {
    it("should return deuce when both teams have 6 points", () => {
      const result = checkIsDeuceWhenGameNotFinished({
        pointLength: 7,
        newTeamAScore: 6,
        newTeamBScore: 6,
      });

      expect(result).toEqual({
        newIsDeuce: true,
      });
    });

    it("should not return deuce when one team has less than 6 points", () => {
      const result = checkIsDeuceWhenGameNotFinished({
        pointLength: 7,
        newTeamAScore: 6,
        newTeamBScore: 5,
      });

      expect(result).toEqual({
        newIsDeuce: false,
      });
    });
  });
});
