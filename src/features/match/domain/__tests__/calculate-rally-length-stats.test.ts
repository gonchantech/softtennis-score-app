import { calculateRallyLengthStats } from "../calculate-rally-length-stats";
import { PointData } from "@/types";

describe("calculateRallyLengthStats", () => {
  it("should initialize stats with zero values", () => {
    const points: PointData[] = [];
    const stats = calculateRallyLengthStats(points);

    expect(stats).toEqual({
      shortRallyCount: 0,
      longRallyCount: 0,
      shortRallyPercentage: 0,
      longRallyPercentage: 0,
    });
  });

  it("should calculate rally length stats correctly", () => {
    const points: PointData[] = [
      {
        server: "A1",
        firstServeIn: true,
        rallyLength: "short",
        player: "A1",
        playType: "forehandstroke",
        ballCourse: "cross",
        timestamp: 1234567890,
        teamAGames: 0,
        teamBGames: 0,
        teamAScore: 1,
        teamBScore: 0,
        gameNumber: 1,
      },
      {
        server: "B1",
        firstServeIn: true,
        rallyLength: "long",
        player: "B1",
        playType: "backhandstroke",
        ballCourse: "cross",
        timestamp: 1234567891,
        teamAGames: 0,
        teamBGames: 0,
        teamAScore: 1,
        teamBScore: 1,
        gameNumber: 1,
      },
    ];

    const stats = calculateRallyLengthStats(points);

    expect(stats.shortRallyCount).toBe(1);
    expect(stats.longRallyCount).toBe(1);
    expect(stats.shortRallyPercentage).toBe(50);
    expect(stats.longRallyPercentage).toBe(50);
  });

  it("should handle all short rallies", () => {
    const points: PointData[] = [
      {
        server: "A1",
        firstServeIn: true,
        rallyLength: "short",
        player: "A1",
        playType: "forehandstroke",
        ballCourse: "cross",
        timestamp: 1234567890,
        teamAGames: 0,
        teamBGames: 0,
        teamAScore: 1,
        teamBScore: 0,
        gameNumber: 1,
      },
      {
        server: "B1",
        firstServeIn: true,
        rallyLength: "short",
        player: "B1",
        playType: "backhandstroke",
        ballCourse: "cross",
        timestamp: 1234567891,
        teamAGames: 0,
        teamBGames: 0,
        teamAScore: 1,
        teamBScore: 1,
        gameNumber: 1,
      },
    ];

    const stats = calculateRallyLengthStats(points);

    expect(stats.shortRallyCount).toBe(2);
    expect(stats.longRallyCount).toBe(0);
    expect(stats.shortRallyPercentage).toBe(100);
    expect(stats.longRallyPercentage).toBe(0);
  });

  it("should handle all long rallies", () => {
    const points: PointData[] = [
      {
        server: "A1",
        firstServeIn: true,
        rallyLength: "long",
        player: "A1",
        playType: "forehandstroke",
        ballCourse: "cross",
        timestamp: 1234567890,
        teamAGames: 0,
        teamBGames: 0,
        teamAScore: 1,
        teamBScore: 0,
        gameNumber: 1,
      },
      {
        server: "B1",
        firstServeIn: true,
        rallyLength: "long",
        player: "B1",
        playType: "backhandstroke",
        ballCourse: "cross",
        timestamp: 1234567891,
        teamAGames: 0,
        teamBGames: 0,
        teamAScore: 1,
        teamBScore: 1,
        gameNumber: 1,
      },
    ];

    const stats = calculateRallyLengthStats(points);

    expect(stats.shortRallyCount).toBe(0);
    expect(stats.longRallyCount).toBe(2);
    expect(stats.shortRallyPercentage).toBe(0);
    expect(stats.longRallyPercentage).toBe(100);
  });
});
