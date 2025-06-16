import { changeStateAfterGameComplete } from "../changeStateAfterGameComplete";

describe("changeStateAfterGameComplete", () => {
  it("should change server from team A to team B", () => {
    const result = changeStateAfterGameComplete(1, "A");

    expect(result).toEqual({
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
  });

  it("should change server from team B to team A", () => {
    const result = changeStateAfterGameComplete(1, "B");

    expect(result).toEqual({
      newCurrentGame: 2,
      newTeamAScore: 0,
      newTeamBScore: 0,
      newIsDeuce: false,
      newIsAdvantage: false,
      newAdvantageTeam: undefined,
      newCurrentServerTeam: "A",
      newCurrentServer: "A1",
      newServesLeft: 2,
    });
  });

  it("should increment game number", () => {
    const result = changeStateAfterGameComplete(2, "A");

    expect(result.newCurrentGame).toBe(3);
  });
});
