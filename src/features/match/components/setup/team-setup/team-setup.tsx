import styles from "./team-setup.module.css";
import { InputField } from "@/components/form";

interface TeamSetupProps {
  teamAName: string;
  teamBName: string;
  playerA1Name: string;
  playerA2Name: string;
  playerB1Name: string;
  playerB2Name: string;
  onTeamANameChange: (name: string) => void;
  onTeamBNameChange: (name: string) => void;
  onPlayerA1NameChange: (name: string) => void;
  onPlayerA2NameChange: (name: string) => void;
  onPlayerB1NameChange: (name: string) => void;
  onPlayerB2NameChange: (name: string) => void;
}

export const TeamSetup: React.FC<TeamSetupProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.teamContainer}>
        <h3 className={styles.teamTitleA}>チームA</h3>
        <InputField
          label="チーム名"
          value={props.teamAName}
          onChange={(e) => props.onTeamANameChange(e.target.value)}
          required
        />
        <InputField
          label="選手1"
          value={props.playerA1Name}
          onChange={(e) => props.onPlayerA1NameChange(e.target.value)}
          required
        />
        <InputField
          label="選手2"
          value={props.playerA2Name}
          onChange={(e) => props.onPlayerA2NameChange(e.target.value)}
          required
        />
      </div>

      <div className={styles.teamContainer}>
        <h3 className={styles.teamTitleB}>チームB</h3>
        <InputField
          label="チーム名"
          value={props.teamBName}
          onChange={(e) => props.onTeamBNameChange(e.target.value)}
          required
        />
        <InputField
          label="選手1"
          value={props.playerB1Name}
          onChange={(e) => props.onPlayerB1NameChange(e.target.value)}
          required
        />
        <InputField
          label="選手2"
          value={props.playerB2Name}
          onChange={(e) => props.onPlayerB2NameChange(e.target.value)}
          required
        />
      </div>
    </div>
  );
};
