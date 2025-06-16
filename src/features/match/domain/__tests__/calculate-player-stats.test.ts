import { calculatePlayerStats } from "../calculate-player-stats";
import { PointData } from "@/types";
import { MatchMeta } from "@/context/match-meta";

describe("calculatePlayerStats", () => {
  const mockMatchMeta: MatchMeta = {
    playerA1Name: "山田太郎",
    playerA2Name: "鈴木花子",
    playerB1Name: "佐藤次郎",
    playerB2Name: "田中三郎",
    matchLength: 5,
    teamAName: "A",
    teamBName: "B",
    initialServer: "A1",
  };

  it("should initialize stats for all players", () => {
    const points: PointData[] = [];
    const stats = calculatePlayerStats(points, mockMatchMeta);

    expect(stats).toHaveLength(4);
    expect(stats[0]).toEqual({
      player: "A1",
      name: "山田太郎",
      pointsWon: 0,
      errors: 0,
      playTypeBreakdown: expect.objectContaining({
        forehandstroke: 0,
        backhandstroke: 0,
      }),
      errorBreakdown: expect.objectContaining({
        forehandstroke: 0,
        backhandstroke: 0,
      }),
    });
  });

  it("should calculate points won correctly", () => {
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
    ];

    const stats = calculatePlayerStats(points, mockMatchMeta);
    const playerA1Stats = stats.find((s) => s.player === "A1");

    expect(playerA1Stats?.pointsWon).toBe(1);
    expect(playerA1Stats?.playTypeBreakdown.forehandstroke).toBe(1);
  });

  it("should calculate errors correctly", () => {
    const points: PointData[] = [
      {
        server: "A1",
        firstServeIn: true,
        rallyLength: "short",
        player: "B1",
        playType: "forehandstroke",
        ballCourse: "cross",
        errorCause: "net",
        timestamp: 1234567890,
        teamAGames: 0,
        teamBGames: 0,
        teamAScore: 1,
        teamBScore: 0,
        gameNumber: 1,
      },
    ];

    const stats = calculatePlayerStats(points, mockMatchMeta);
    const playerB1Stats = stats.find((s) => s.player === "B1");

    expect(playerB1Stats?.errors).toBe(1);
    expect(playerB1Stats?.errorBreakdown.forehandstroke).toBe(1);
  });

  it("should handle multiple points correctly", () => {
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

    const stats = calculatePlayerStats(points, mockMatchMeta);
    const playerA1Stats = stats.find((s) => s.player === "A1");
    const playerB1Stats = stats.find((s) => s.player === "B1");

    expect(playerA1Stats?.pointsWon).toBe(1);
    expect(playerA1Stats?.playTypeBreakdown.forehandstroke).toBe(1);
    expect(playerB1Stats?.pointsWon).toBe(1);
    expect(playerB1Stats?.playTypeBreakdown.backhandstroke).toBe(1);
  });
});
