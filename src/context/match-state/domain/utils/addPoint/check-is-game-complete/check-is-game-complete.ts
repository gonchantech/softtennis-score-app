type CheckIsGameCompleteProps = {
  pointLength: 4 | 7;
  prevIsDeuce: boolean;
  prevIsAdvantage: boolean;
  prevTeamAGames: number;
  prevTeamBGames: number;
  newTeamAScore: number;
  newTeamBScore: number;
};

export function checkIsGameComplete({
  pointLength,
  prevIsDeuce,
  prevIsAdvantage,
  prevTeamAGames,
  prevTeamBGames,
  newTeamAScore,
  newTeamBScore,
}: CheckIsGameCompleteProps) {
  if (
    (newTeamAScore === pointLength && !prevIsDeuce) ||
    (prevIsAdvantage && newTeamAScore > newTeamBScore)
  ) {
    return {
      newTeamAGames: prevTeamAGames + 1,
      newTeamBGames: prevTeamBGames,
      newIsGameComplete: true,
    };
  } else if (
    (newTeamBScore === pointLength && !prevIsDeuce) ||
    (prevIsAdvantage && newTeamBScore > newTeamAScore)
  ) {
    return {
      newTeamAGames: prevTeamAGames,
      newTeamBGames: prevTeamBGames + 1,
      newIsGameComplete: true,
    };
  }

  return {
    newTeamAGames: prevTeamAGames,
    newTeamBGames: prevTeamBGames,
    newIsGameComplete: false,
  };
}
