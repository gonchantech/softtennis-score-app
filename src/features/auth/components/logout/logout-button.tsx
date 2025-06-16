"use client";

import { Button } from "@/components/button";
import { useLogout } from "../../api/logout";

type LogoutButtonProps = {
  onSuccess: () => void;
  onError: (error: Error) => void;
};

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  onSuccess,
  onError,
}) => {
  const { submit: logout, isPending } = useLogout({ onSuccess, onError });

  return (
    <Button
      onClick={() => logout()}
      variant="solid"
      size="md"
      color="gray"
      isLoading={isPending}
    >
      ログアウト
    </Button>
  );
};
