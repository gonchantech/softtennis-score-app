"use client";

import { Suspense } from "react";
import { LoginForm } from "@/features/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/container";

const LoginPageContent = () => {
  const router = useRouter();
  const redirect = useSearchParams().get("redirect") as string;

  const onSuccess = () => {
    if (redirect && redirect !== "") {
      router.replace(redirect);
    } else {
      router.replace("/");
    }
  };

  const onError = () => {
    console.log("ログインに失敗しました。id, name, passwordを確認してください");
  };

  return (
    <Container variant="center" height="auto">
      <LoginForm onSuccess={onSuccess} onError={onError} />
    </Container>
  );
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}
