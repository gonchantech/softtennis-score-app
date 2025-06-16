"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ConfirmModal } from "@/components/modal";
import { Scoring } from "@/features/match";

export default function MatchPage() {
  const router = useRouter();
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleConfirmComplete = () => {
    router.push("/match/result");
    setShowCompleteModal(false);
  };

  const handleConfirmError = () => {
    setShowErrorModal(false);
  };

  const handleCancelComplete = () => {
    setShowCompleteModal(false);
  };
  return (
    <>
      <Scoring
        setShowCompleteModal={setShowCompleteModal}
        setShowErrorModal={setShowErrorModal}
      />
      <ConfirmModal
        isOpen={showCompleteModal}
        message="試合を終了しますか？"
        onConfirm={handleConfirmComplete}
        onCancel={handleCancelComplete}
      />
      <ConfirmModal
        isOpen={showErrorModal}
        message="試合が終了しているので、新しいポイントを記録できません"
        onConfirm={handleConfirmError}
      />
    </>
  );
}
