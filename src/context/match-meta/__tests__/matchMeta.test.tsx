import { renderHook, act } from "@testing-library/react";
import { MatchMeta } from "../types";
import { useMatchMeta } from "../use-match-context";
import { defaultMatchMeta } from "../constants/defaultMatchMeta";
import { MatchMetaProvider } from "../match-meta-provider";

const testMatchMeta: MatchMeta = {
  matchLength: 5,
  teamAName: "Team A",
  teamBName: "Team B",
  playerA1Name: "Player A1",
  playerA2Name: "Player A2",
  playerB1Name: "Player B1",
  playerB2Name: "Player B2",
  initialServer: "A1",
};

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <MatchMetaProvider>{children}</MatchMetaProvider>;
};

describe("useMatchMeta", () => {
  it("should initialize with default match meta", async () => {
    const hook = renderHook(() => useMatchMeta(), {
      wrapper,
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(hook.result.current.state).toEqual(defaultMatchMeta);

    act(() => {
      hook.result.current.setupMatchMeta(testMatchMeta);
    });

    expect(hook.result.current.state).toEqual(testMatchMeta);

    act(() => {
      hook.result.current.resetMatchMeta();
    });

    expect(hook.result.current.state).toEqual(defaultMatchMeta);
  });
});
