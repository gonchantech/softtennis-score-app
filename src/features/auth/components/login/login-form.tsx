"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/button";
import { InputField } from "@/components/form";
import styles from "./login-form.module.css";
import { useLogin } from "../../api";
import { useState } from "react";

type LoginFormData = {
  email: string;
  password: string;
};

interface LoginFormProps {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

const getErrorMessage = (error: Error): string => {
  const message = error.message.toLowerCase();
  if (message.includes("invalid login credentials")) {
    return "メールアドレスまたはパスワードが正しくありません";
  }
  if (message.includes("email not confirmed")) {
    return "メールアドレスの確認が完了していません";
  }
  if (message.includes("network")) {
    return "ネットワークエラーが発生しました。インターネット接続を確認してください";
  }
  return "ログインに失敗しました。しばらく経ってから再度お試しください";
};

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onError }) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const login = useLogin({
    onSuccess,
    onError: (error) => {
      setErrorMessage(getErrorMessage(error));
      onError(error);
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage(""); // フォーム送信時にエラーメッセージをクリア
    login.submit(data);
  };

  return (
    <div className={styles.content}>
      <h1 className={styles.title}>ログイン</h1>
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <InputField
          id="email"
          label="メールアドレス"
          type="text"
          {...register("email", { required: "メールアドレスは必須です" })}
          error={errors.email?.message}
          placeholder="メールアドレスを入力"
          size="md"
        />

        <InputField
          id="password"
          label="パスワード"
          type="password"
          {...register("password", { required: "パスワードは必須です" })}
          error={errors.password?.message}
          placeholder="••••••••"
          size="md"
        />

        <Button
          type="submit"
          color="primary"
          size="md"
          isLoading={isSubmitting}
          fullWidth
        >
          ログイン
        </Button>
      </form>
    </div>
  );
};
