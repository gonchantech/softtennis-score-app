"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/button";
import { InputField } from "@/components/form";
import styles from "./signup-form.module.css";
import { useSignup } from "../../api";
import { AuthData } from "../../types";
import { useState } from "react";

type SignupFormData = AuthData;

interface SignupFormProps {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({
  onSuccess,
  onError,
}) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>();

  const signup = useSignup({
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
      onError(error);
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setErrorMessage(""); // フォーム送信時にエラーメッセージをクリア
    signup.submit(data);
  };

  return (
    <div className={styles.content}>
      <h1 className={styles.title}>新規登録</h1>
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
          新規登録
        </Button>
      </form>
    </div>
  );
};
