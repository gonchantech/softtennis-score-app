import styles from "./server-selector.module.css";
import { Button } from "@/components/button";
import { Player } from "@/types";

interface ServerSelectorProps {
  initialServer: Player;
  onInitialServerChange: (player: Player) => void;
  playerA1Name: string;
  playerA2Name: string;
  playerB1Name: string;
  playerB2Name: string;
}

export const ServerSelector: React.FC<ServerSelectorProps> = (props) => {
  return (
    <div>
      <label className={styles.label}>最初のサーバー</label>
      <div className={styles.buttonGrid}>
        <Button
          variant="solid"
          color={props.initialServer === "A1" ? "secondary" : "gray"}
          onClick={() => props.onInitialServerChange("A1")}
          type="button"
        >
          {props.playerA1Name}
        </Button>
        <Button
          variant="solid"
          color={props.initialServer === "A2" ? "secondary" : "gray"}
          onClick={() => props.onInitialServerChange("A2")}
          type="button"
        >
          {props.playerA2Name}
        </Button>
        <Button
          variant="solid"
          color={props.initialServer === "B1" ? "primary" : "gray"}
          onClick={() => props.onInitialServerChange("B1")}
          type="button"
        >
          {props.playerB1Name}
        </Button>
        <Button
          variant="solid"
          color={props.initialServer === "B2" ? "primary" : "gray"}
          onClick={() => props.onInitialServerChange("B2")}
          type="button"
        >
          {props.playerB2Name}
        </Button>
      </div>
    </div>
  );
};
