import styles from "./match-format-selector.module.css";
import { Button } from "@/components/button";
import { MatchLength } from "@/context/match-meta";

interface MatchFormatSelectorProps {
  matchLength: MatchLength;
  onMatchLengthChange: (length: MatchLength) => void;
}

export const MatchFormatSelector: React.FC<MatchFormatSelectorProps> = ({
  matchLength,
  onMatchLengthChange,
}) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>試合形式</label>
      <div className={styles.buttonGroup}>
        <Button
          variant="solid"
          color={matchLength === 5 ? "primary" : "gray"}
          fullWidth
          onClick={() => onMatchLengthChange(5)}
          type="button"
        >
          5ゲームマッチ
        </Button>
        <Button
          variant="solid"
          color={matchLength === 7 ? "primary" : "gray"}
          fullWidth
          onClick={() => onMatchLengthChange(7)}
          type="button"
        >
          7ゲームマッチ
        </Button>
      </div>
    </div>
  );
};
