import { MatchResultMeta } from "@/context/match-meta";
import { MatchHistoryCard } from "./match-history-card";
import { EmptyState } from "@/components/empty-state";
import styles from "./match-history-list.module.css";
import { Stack } from "@/components/stack";

type MatchHistoryListProps = {
  matches: MatchResultMeta[];
  isLoading?: boolean;
  onViewDetails: (matchId: string) => void;
};

export const MatchHistoryList: React.FC<MatchHistoryListProps> = ({
  matches,
  isLoading,
  onViewDetails,
}) => {
  if (isLoading) {
    return (
      <Stack direction="vertical" gap="sm">
        {[...Array(3)].map((_, i) => (
          <div key={i} className={styles.skeleton} />
        ))}
      </Stack>
    );
  }

  if (matches.length === 0) {
    return (
      <EmptyState
        title="No matches yet"
        description="Start recording your matches to see them here"
        icon="trophy"
      />
    );
  }

  return (
    <div className={styles.list}>
      {matches.map((match) => (
        <MatchHistoryCard
          key={match.id}
          match={match}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};
