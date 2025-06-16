type CheckIsDeuceWhenGameNotFinishedProps = {
  pointLength: 4 | 7;
  newTeamAScore: number;
  newTeamBScore: number;
};

// advantageのときはdeuceもtrueになる。
export function checkIsDeuceWhenGameNotFinished({
  pointLength,
  newTeamAScore,
  newTeamBScore,
}: CheckIsDeuceWhenGameNotFinishedProps) {
  if (newTeamAScore >= pointLength - 1 && newTeamBScore >= pointLength - 1) {
    return { newIsDeuce: true };
  }
  return { newIsDeuce: false };
}
