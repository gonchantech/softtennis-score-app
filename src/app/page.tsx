"use client";

import { useRouter } from "next/navigation";
import { MatchSetupForm } from "@/features/match";
import styles from "./page.module.css";

export default function MatchSetupPage() {
  const router = useRouter();
  const onSubmit = () => {
    router.push("/match");
  };
  return (
    <div className={styles.container}>
      <MatchSetupForm onSubmit={onSubmit} />
    </div>
  );
}
