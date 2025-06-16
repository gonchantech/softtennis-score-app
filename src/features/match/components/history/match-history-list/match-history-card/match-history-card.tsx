import { MatchResultMeta } from "@/context/match-meta";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import styles from "./match-history-card.module.css";

type MatchHistoryCardProps = {
  match: MatchResultMeta;
  onViewDetails: (matchId: string) => void;
};

export const MatchHistoryCard: React.FC<MatchHistoryCardProps> = ({
  match,
  onViewDetails,
}) => {
  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <div className={styles.info}>
          <h3 className={styles.title}>
            {match.playerA1Name}・{match.playerA2Name} vs {match.playerB1Name}・
            {match.playerB2Name}
          </h3>
          <p className={styles.teamNames}>
            {match.teamAName} vs {match.teamBName}
          </p>
          <p className={styles.date}>{match.savedAt?.toLocaleString()}</p>
        </div>
        <div className={styles.score}>
          <p className={styles.scoreValue}>
            {match.teamAGames} - {match.teamBGames}
          </p>
          <div className={styles.actions}>
            <Button
              onClick={() => onViewDetails(match.id)}
              variant="solid"
              size="sm"
              color="secondary"
            >
              詳細を見る
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
