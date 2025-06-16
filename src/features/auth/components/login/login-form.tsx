"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/button";
import { InputField } from "@/components/form";
import styles from "./login-form.module.css";
import { useLogin } from "../../api";

type LoginFormData = {
  email: string;
  password: string;
};

interface LoginFormProps {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onError }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const login = useLogin({ onSuccess, onError });

  const onSubmit = async (data: LoginFormData) => {
    login.submit(data);
  };

  return (
    <div className={styles.content}>
      <h1 className={styles.title}>ログイン</h1>
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
