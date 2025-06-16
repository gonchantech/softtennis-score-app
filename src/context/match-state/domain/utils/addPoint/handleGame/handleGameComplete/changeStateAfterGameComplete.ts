export function changeStateAfterGameComplete(
  prevCurrentGame: number,
  prevCurrentServerTeam: string
): {
  newCurrentGame: number;
  newTeamAScore: 0;
  newTeamBScore: 0;
  newIsDeuce: false;
  newIsAdvantage: false;
  newAdvantageTeam: undefined;
  newCurrentServerTeam: "A" | "B";
  newCurrentServer: "B1" | "A1";
  newServesLeft: 2;
} {
  return {
    newCurrentGame: prevCurrentGame + 1,
    newTeamAScore: 0,
    newTeamBScore: 0,
    newIsDeuce: false,
    newIsAdvantage: false,
    newAdvantageTeam: undefined,
    newCurrentServerTeam: prevCurrentServerTeam === "A" ? "B" : "A",
    newCurrentServer: prevCurrentServerTeam === "A" ? "B1" : "A1",
    newServesLeft: 2,
  };
}
