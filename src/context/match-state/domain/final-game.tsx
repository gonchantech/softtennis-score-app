import { RawPointInput, Player } from "@/types";
import { addPoint } from "./utils/addPoint/addPoint";
import { MatchState } from "../types";

type FinalGameAddPointProps = {
  prevState: MatchState;
  pointData: RawPointInput;
  matchLength: number;
  initialServer: Player;
};

export class FinalGame {
  private static readonly pointLength = 7;

  public static addPoint({
    prevState,
    pointData,
    matchLength,
    initialServer,
  }: FinalGameAddPointProps): MatchState {
    return addPoint({
      calculateNewServerWhenGameNotFinished:
        this.calculateNewServerWhenGameNotFinished.bind(null, initialServer),
      pointLength: this.pointLength,
      prevState,
      pointData,
      matchLength,
    });
  }

  private static calculateNewServerWhenGameNotFinished(
    initialServer: Player,
    prevServesLeft: number,
    prevCurrentServerTeam: "A" | "B",
    prevCurrentServer: Player
  ): {
    newCurrentServer: Player;
    newServesLeft: number;
  } {
    if (prevServesLeft - 1 === 0) {
      const serverLotation =
        initialServer === "A1"
          ? ["A1", "B1", "A2", "B2"]
          : initialServer === "B1"
          ? ["B1", "A1", "B2", "A2"]
          : initialServer === "A2"
          ? ["A2", "B1", "A1", "B2"]
          : ["B2", "A1", "B1", "A2"];
      const currentIndex = serverLotation.indexOf(prevCurrentServer);
      const nextIndex = (currentIndex + 1) % 4;
      return {
        newCurrentServer: serverLotation[nextIndex] as Player,
        newServesLeft: 2,
      };
    }
    return {
      newCurrentServer: prevCurrentServer,
      newServesLeft: prevServesLeft - 1,
    };
  }
}
