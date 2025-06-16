import type { Metadata } from "next";
import "../../globals.css";
import { Protected } from "@/features/auth";

export const metadata: Metadata = {
  title: "ソフトテニススコアキーパー",
  description: "ソフトテニスの試合スコアを記録・管理するアプリケーション",
};

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Protected>{children}</Protected>;
}
