import { RawPointInput, Player } from "@/types";
import { addPoint } from "./utils/addPoint/addPoint";
import { MatchState } from "../types";

type RegularGameAddPointProps = {
  prevState: MatchState;
  pointData: RawPointInput;
  matchLength: number;
};

export class RegularGame {
  private static readonly pointLength = 4;

  public static addPoint({
    prevState,
    pointData,
    matchLength,
  }: RegularGameAddPointProps): MatchState {
    return addPoint({
      calculateNewServerWhenGameNotFinished:
        this.calculateNewServerWhenGameNotFinished,
      pointLength: this.pointLength,
      prevState,
      pointData,
      matchLength,
    });
  }

  private static calculateNewServerWhenGameNotFinished(
    prevServesLeft: number,
    prevCurrentServerTeam: "A" | "B",
    prevCurrentServer: Player
  ): {
    newCurrentServer: Player;
    newServesLeft: number;
  } {
    if (prevServesLeft - 1 === 0) {
      const currentServerTeamPlayers =
        prevCurrentServerTeam === "A" ? ["A1", "A2"] : ["B1", "B2"];
      const currentIndex = currentServerTeamPlayers.indexOf(prevCurrentServer);
      const nextIndex = (currentIndex + 1) % 2;
      return {
        newCurrentServer: currentServerTeamPlayers[nextIndex] as Player,
        newServesLeft: 2,
      };
    }
    return {
      newCurrentServer: prevCurrentServer,
      newServesLeft: prevServesLeft - 1,
    };
  }
}
