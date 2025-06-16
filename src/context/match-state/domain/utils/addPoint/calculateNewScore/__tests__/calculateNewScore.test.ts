import { calculateNewScore } from "../calculateNewScore";
import { RawPointInput } from "@/features/match";
import { Player } from "@/features/match/types/player";
import { getIsTeamAPoint } from "@/utils/getIsTeamAPoint";

jest.mock("@/utils/getIsTeamAPoint");

describe("calculateNewScore", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should increment team A score when team A wins the point", () => {
    (getIsTeamAPoint as jest.Mock).mockReturnValue(true);

    const prevTeamAScore = 0;
    const prevTeamBScore = 0;
    const pointData: RawPointInput = {
      server: "A1" as Player,
      firstServeIn: true,
      rallyLength: "short",
      player: "A1" as Player,
      playType: "forehandstroke",
      ballCourse: "cross",
    };

    const result = calculateNewScore({
      prevTeamAScore,
      prevTeamBScore,
      pointData,
    });

    expect(getIsTeamAPoint).toHaveBeenCalledWith(pointData);
    expect(result).toEqual({
      newTeamAScore: 1,
      newTeamBScore: 0,
    });
  });

  it("should increment team B score when team B wins the point", () => {
    (getIsTeamAPoint as jest.Mock).mockReturnValue(false);

    const prevTeamAScore = 0;
    const prevTeamBScore = 0;
    const pointData: RawPointInput = {
      server: "A1" as Player,
      firstServeIn: true,
      rallyLength: "short",
      player: "B1" as Player,
      playType: "forehandstroke",
      ballCourse: "cross",
    };

    const result = calculateNewScore({
      prevTeamAScore,
      prevTeamBScore,
      pointData,
    });

    expect(getIsTeamAPoint).toHaveBeenCalledWith(pointData);
    expect(result).toEqual({
      newTeamAScore: 0,
      newTeamBScore: 1,
    });
  });
});
