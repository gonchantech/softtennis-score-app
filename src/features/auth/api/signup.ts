"use client";

import { useMutation } from "@tanstack/react-query";
import { AuthUser, AuthData } from "../types";
import { createClient } from "@/lib/supabase/client";

export const Signup = async (data: AuthData): Promise<{ user: AuthUser }> => {
  const supabase = createClient();

  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) throw error;
  if (!authData.user) throw new Error("ユーザー登録に失敗しました");

  // Supabaseのユーザー情報をAuthUserの形式に変換
  const user: AuthUser = {
    id: authData.user.id,
    email: authData.user.email || "",
  };

  return { user };
};

type UseSignupOptions = {
  onSuccess?: (user: AuthUser) => void;
  onError?: (error: Error) => void;
};

export const useSignup = ({ onSuccess, onError }: UseSignupOptions) => {
  const { mutate: submit, isPending } = useMutation({
    mutationFn: Signup,
    onSuccess: ({ user }) => {
      onSuccess?.(user);
    },
    onError: (error) => {
      onError?.(error);
    },
  });

  return { submit, isPending };
};
