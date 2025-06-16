import { RawPointInput } from "@/types";
import { getIsTeamAPoint } from "@/utils/getIsTeamAPoint";

type CalculateNewScoreProps = {
  prevTeamAScore: number;
  prevTeamBScore: number;
  pointData: RawPointInput;
};

export function calculateNewScore({
  prevTeamAScore,
  prevTeamBScore,
  pointData,
}: CalculateNewScoreProps): {
  newTeamAScore: number;
  newTeamBScore: number;
} {
  const isTeamAPoint = getIsTeamAPoint(pointData);
  if (isTeamAPoint) {
    return {
      newTeamAScore: prevTeamAScore + 1,
      newTeamBScore: prevTeamBScore,
    };
  } else {
    return {
      newTeamAScore: prevTeamAScore,
      newTeamBScore: prevTeamBScore + 1,
    };
  }
}
