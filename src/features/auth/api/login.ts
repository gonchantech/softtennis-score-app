"use client";

import { createClient } from "@/lib/supabase/client";
import { AuthUser, AuthData } from "../types";
import { queryClient } from "@/lib/reactQuery";
import { useMutation } from "@tanstack/react-query";

export const Login = async (data: AuthData): Promise<{ user: AuthUser }> => {
  const supabase = createClient();

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) throw error;

  const user: AuthUser = {
    id: authData.user.id,
    email: authData.user.email || "",
  };

  return { user };
};

type UseLoginOptions = {
  onSuccess?: (user: AuthUser) => void;
  onError?: (error: Error) => void;
};

export const useLogin = ({ onSuccess, onError }: UseLoginOptions) => {
  const { mutate: submit, isPending } = useMutation({
    mutationFn: Login,
    onSuccess: ({ user }) => {
      queryClient.setQueryData(["auth-user"], user);
      onSuccess?.(user);
    },
    onError: (error) => {
      onError?.(error);
    },
  });

  return { submit, isPending };
};
