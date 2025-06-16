import { calculateServeStats } from "../calculate-serve-stats";
import { PointData } from "@/types";
import { MatchMeta } from "@/context/match-meta";

describe("calculateServeStats", () => {
  const mockMatchMeta: MatchMeta = {
    playerA1Name: "山田太郎",
    playerA2Name: "鈴木花子",
    playerB1Name: "佐藤次郎",
    playerB2Name: "田中三郎",
    matchLength: 5,
    teamAName: "チームA",
    teamBName: "チームB",
    initialServer: "A1",
  };

  it("should initialize stats for all players", () => {
    const points: PointData[] = [];
    const stats = calculateServeStats(points, mockMatchMeta);

    expect(stats).toHaveLength(4);
    expect(stats[0]).toEqual({
      player: "A1",
      name: "山田太郎",
      firstServeAttempts: 0,
      firstServeIn: 0,
      successRate: 0,
    });
  });

  it("should calculate serve stats correctly", () => {
    const points: PointData[] = [
      {
        server: "A1",
        firstServeIn: true,
        rallyLength: "short",
        player: "A1",
        playType: "serve",
        ballCourse: "cross",
        timestamp: 1234567890,
        teamAGames: 0,
        teamBGames: 0,
        teamAScore: 1,
        teamBScore: 0,
        gameNumber: 1,
      },
      {
        server: "A1",
        firstServeIn: false,
        rallyLength: "short",
        player: "A1",
        playType: "serve",
        ballCourse: "cross",
        timestamp: 1234567891,
        teamAGames: 0,
        teamBGames: 0,
        teamAScore: 1,
        teamBScore: 0,
        gameNumber: 1,
      },
    ];

    const stats = calculateServeStats(points, mockMatchMeta);
    const playerA1Stats = stats.find((s) => s.player === "A1");

    expect(playerA1Stats?.firstServeAttempts).toBe(2);
    expect(playerA1Stats?.firstServeIn).toBe(1);
    expect(playerA1Stats?.successRate).toBe(50);
  });

  it("should handle multiple servers correctly", () => {
    const points: PointData[] = [
      {
        server: "A1",
        firstServeIn: true,
        rallyLength: "short",
        player: "A1",
        playType: "serve",
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
        playType: "serve",
        ballCourse: "cross",
        timestamp: 1234567891,
        teamAGames: 0,
        teamBGames: 0,
        teamAScore: 1,
        teamBScore: 1,
        gameNumber: 1,
      },
    ];

    const stats = calculateServeStats(points, mockMatchMeta);
    const playerA1Stats = stats.find((s) => s.player === "A1");
    const playerB1Stats = stats.find((s) => s.player === "B1");

    expect(playerA1Stats?.firstServeAttempts).toBe(1);
    expect(playerA1Stats?.firstServeIn).toBe(1);
    expect(playerA1Stats?.successRate).toBe(100);
    expect(playerB1Stats?.firstServeAttempts).toBe(1);
    expect(playerB1Stats?.firstServeIn).toBe(1);
    expect(playerB1Stats?.successRate).toBe(100);
  });

  it("should handle zero attempts correctly", () => {
    const points: PointData[] = [];
    const stats = calculateServeStats(points, mockMatchMeta);
    const playerA1Stats = stats.find((s) => s.player === "A1");

    expect(playerA1Stats?.firstServeAttempts).toBe(0);
    expect(playerA1Stats?.firstServeIn).toBe(0);
    expect(playerA1Stats?.successRate).toBe(0);
  });
});
