export function getPlayerName(
  playerId: string,
  playerA1Name: string,
  playerA2Name: string,
  playerB1Name: string,
  playerB2Name: string
) {
  switch (playerId) {
    case "A1":
      return playerA1Name;
    case "A2":
      return playerA2Name;
    case "B1":
      return playerB1Name;
    case "B2":
      return playerB2Name;
    default:
      return playerId;
  }
}
