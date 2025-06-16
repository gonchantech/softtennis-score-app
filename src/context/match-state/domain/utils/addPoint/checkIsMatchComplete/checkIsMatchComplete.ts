type CheckIsMatchCompleteProps = {
  newIsGameComplete: boolean;
  newTeamAGames: number;
  newTeamBGames: number;
  matchLength: number;
};

export function checkIsMatchComplete({
  newIsGameComplete,
  newTeamAGames,
  newTeamBGames,
  matchLength,
}: CheckIsMatchCompleteProps): { newIsMatchComplete: boolean } {
  if (!newIsGameComplete) {
    return { newIsMatchComplete: false };
  }

  if (newTeamAGames > matchLength / 2 || newTeamBGames > matchLength / 2) {
    return { newIsMatchComplete: true };
  }
  return { newIsMatchComplete: false };
}
