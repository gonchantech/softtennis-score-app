import { renderHook, act } from "@testing-library/react";
import { RawPointInput } from "@/types";
import { useMatchState } from "../use-match-state";
import { defaultMatchState } from "../constants/default-match-state";
import { MatchStateProvider } from "../match-state-provider";

const mockPointDataA: RawPointInput = {
  server: "A1",
  firstServeIn: true,
  rallyLength: "short",
  player: "A1",
  playType: "forehandstroke",
  ballCourse: "cross",
};

const mockPointDataB: RawPointInput = {
  server: "B1",
  firstServeIn: true,
  rallyLength: "short",
  player: "B1",
  playType: "forehandstroke",
  ballCourse: "cross",
};

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <MatchStateProvider>{children}</MatchStateProvider>;
};

describe("useMatchState", () => {
  let hook: { result: { current: ReturnType<typeof useMatchState> } };

  beforeEach(async () => {
    hook = renderHook(() => useMatchState(), {
      wrapper,
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  });

  afterEach(() => {
    act(() => {
      hook.result.current.resetMatchState();
    });
  });

  it("should initialize with default match state", () => {
    expect(hook.result.current.state).toEqual(defaultMatchState);
  });

  it("should handle point addition in regular game", async () => {
    act(() => {
      hook.result.current.addPoint(mockPointDataA, 5, "A1");
    });

    expect(hook.result.current.state).toEqual({
      ...defaultMatchState,
      teamAScore: 1,
      teamBScore: 0,
      servesLeft: 1,
      points: [
        {
          ...mockPointDataA,
          timestamp: expect.any(Number),
          teamAGames: 0,
          teamBGames: 0,
          teamAScore: 1,
          teamBScore: 0,
          gameNumber: 1,
        },
      ],
    });
  });

  it("should handle point addition in final game", async () => {
    // 5ゲーム目まで進める
    act(() => {
      for (let i = 0; i < 8; i++) {
        hook.result.current.addPoint(mockPointDataA, 5, "A1");
      }
      for (let i = 0; i < 8; i++) {
        hook.result.current.addPoint(mockPointDataB, 5, "B1");
      }
    });

    // 5ゲーム目（ファイナルゲーム）でポイントを追加
    act(() => {
      hook.result.current.addPoint(mockPointDataA, 5, "A1");
    });

    expect(hook.result.current.state.currentGame).toBe(5);
    expect(hook.result.current.state.points).toHaveLength(17);
  });

  it("should handle point removal", async () => {
    // ポイントを追加
    act(() => {
      hook.result.current.addPoint(mockPointDataA, 5, "A1");
    });

    // ポイントを削除
    act(() => {
      hook.result.current.removeLatestPoint();
    });

    expect(hook.result.current.state).toEqual(defaultMatchState);
  });

  it("should handle server change", async () => {
    act(() => {
      hook.result.current.changeServer("B1");
    });

    expect(hook.result.current.state).toEqual({
      ...defaultMatchState,
      currentServer: "B1",
      currentServerTeam: "B",
      servesLeft: 2,
    });
  });

  it("should handle match completion", async () => {
    act(() => {
      hook.result.current.completeMatch();
    });

    expect(hook.result.current.state.isMatchComplete).toBe(true);
  });

  it("should handle state reset", async () => {
    // 状態を変更
    act(() => {
      hook.result.current.addPoint(mockPointDataA, 5, "A1");
    });

    // リセット
    act(() => {
      hook.result.current.resetMatchState();
    });

    expect(hook.result.current.state).toEqual(defaultMatchState);
  });
});
