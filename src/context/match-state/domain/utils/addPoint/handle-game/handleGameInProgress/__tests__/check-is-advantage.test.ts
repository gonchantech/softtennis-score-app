import { checkIsAdvantageWhenGameNotFinished } from "../check-is-advantage";

describe("checkIsAdvantageWhenGameNotFinished", () => {
  describe("when not in deuce", () => {
    it("should return no advantage", () => {
      const result = checkIsAdvantageWhenGameNotFinished({
        isPrevDeuce: false,
        newTeamAScore: 3,
        newTeamBScore: 2,
      });

      expect(result).toEqual({
        newIsAdvantage: false,
        newAdvantageTeam: undefined,
      });
    });
  });

  describe("when in deuce", () => {
    it("should return advantage for team A when they lead", () => {
      const result = checkIsAdvantageWhenGameNotFinished({
        isPrevDeuce: true,
        newTeamAScore: 4,
        newTeamBScore: 3,
      });

      expect(result).toEqual({
        newIsAdvantage: true,
        newAdvantageTeam: "A",
      });
    });

    it("should return advantage for team B when they lead", () => {
      const result = checkIsAdvantageWhenGameNotFinished({
        isPrevDeuce: true,
        newTeamAScore: 3,
        newTeamBScore: 4,
      });

      expect(result).toEqual({
        newIsAdvantage: true,
        newAdvantageTeam: "B",
      });
    });

    it("should return no advantage when scores are equal", () => {
      const result = checkIsAdvantageWhenGameNotFinished({
        isPrevDeuce: true,
        newTeamAScore: 4,
        newTeamBScore: 4,
      });

      expect(result).toEqual({
        newIsAdvantage: false,
        newAdvantageTeam: undefined,
      });
    });
  });
});
