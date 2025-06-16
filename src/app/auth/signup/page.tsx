"use client";
import { SignupForm } from "@/features/auth";
import { useRouter } from "next/navigation";
import { Container } from "@/components/container";

const SignupPage = () => {
  const router = useRouter();

  const onSuccess = () => {
    router.replace("/auth/login");
  };

  const onError = () => {
    console.log(
      "サインアップに失敗しました。id, name, passwordを確認してください"
    );
  };
  return (
    <Container variant="center" height="auto">
      <SignupForm onSuccess={onSuccess} onError={onError} />
    </Container>
  );
};

export default SignupPage;
