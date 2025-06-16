import { MatchState } from "../types";

export const defaultMatchState: MatchState = {
  teamAScore: 0,
  teamBScore: 0,
  teamAGames: 0,
  teamBGames: 0,
  currentServerTeam: "A",
  currentServer: "A1",
  servesLeft: 2,
  isDeuce: false,
  isAdvantage: false,
  advantageTeam: undefined,
  currentGame: 1,
  points: [],
  isMatchComplete: false,
  isGameComplete: false,
};
