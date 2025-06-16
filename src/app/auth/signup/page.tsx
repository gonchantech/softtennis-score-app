"use client";
import { SignupForm } from "@/features/auth";
import { useRouter } from "next/navigation";
import { Container } from "@/components/container";
import { useNotification } from "@/context/notifications";

const SignupPage = () => {
  const router = useRouter();
  const { showNotification } = useNotification();

  const onSuccess = () => {
    showNotification({
      type: "success",
      title: "サインアップ成功",
      message: "確認メールを送信しました。メールを確認してください",
    });
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
