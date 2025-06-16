import { useMutation } from "@tanstack/react-query";

import { createClient } from "@/lib/supabase/client";
import { queryClient } from "@/lib/reactQuery";

export const logout = () => {
  const supabase = createClient();
  return supabase.auth.signOut();
};

type UseLogoutOptions = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export const useLogout = ({ onSuccess, onError }: UseLogoutOptions) => {
  const { mutate: submit, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });

  return { submit, isPending };
};
