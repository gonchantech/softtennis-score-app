"use client";

import { Suspense } from "react";
import { LoginForm } from "@/features/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/container";

const LoginPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const onSuccess = () => {
    if (redirect) {
      router.push(decodeURIComponent(redirect));
    } else {
      router.push("/");
    }
  };
  //これコンソールじゃわかりにくいから替えよう

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
