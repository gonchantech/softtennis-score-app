"use client";

import { useMutation } from "@tanstack/react-query";
import { AuthUser, AuthData } from "../types";
import { createClient } from "@/lib/supabase/client";

const getErrorMessage = (error: Error): string => {
  const message = error.message.toLowerCase();
  if (
    message.includes("email already registered") ||
    message.includes("user_repeated_signup")
  ) {
    return "このメールアドレスは既に登録されています";
  }
  if (message.includes("password")) {
    return "パスワードは6文字以上で設定してください";
  }
  if (message.includes("email")) {
    return "有効なメールアドレスを入力してください";
  }
  if (message.includes("network")) {
    return "ネットワークエラーが発生しました。インターネット接続を確認してください";
  }
  return "ユーザー登録に失敗しました。しばらく経ってから再度お試しください";
};

export const Signup = async (data: AuthData): Promise<{ user: AuthUser }> => {
  const supabase = createClient();

  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) throw new Error(getErrorMessage(error));
  if (!authData.user) throw new Error("ユーザー登録に失敗しました");

  // メール確認が必要な場合のエラーハンドリング
  if (authData.user.identities?.length === 0) {
    throw new Error("このメールアドレスは既に登録されています");
  }

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
      console.log("ユーザー登録成功", user);
      onSuccess?.(user);
    },
    onError: (error) => {
      console.log("ユーザー登録失敗", error);
      onError?.(error);
    },
  });

  return { submit, isPending };
};
