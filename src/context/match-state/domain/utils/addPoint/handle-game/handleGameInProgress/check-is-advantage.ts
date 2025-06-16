type CheckIsAdvantageWhenGameNotFinishedProps = {
  isPrevDeuce: boolean;
  newTeamAScore: number;
  newTeamBScore: number;
};

export function checkIsAdvantageWhenGameNotFinished({
  isPrevDeuce,
  newTeamAScore,
  newTeamBScore,
}: CheckIsAdvantageWhenGameNotFinishedProps) {
  if (isPrevDeuce) {
    if (newTeamAScore > newTeamBScore) {
      return { newIsAdvantage: true, newAdvantageTeam: "A" };
    } else if (newTeamBScore > newTeamAScore) {
      return { newIsAdvantage: true, newAdvantageTeam: "B" };
    }
  }
  return { newIsAdvantage: false, newAdvantageTeam: undefined };
}
