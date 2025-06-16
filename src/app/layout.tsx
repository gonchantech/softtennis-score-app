import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import styles from "./layout.module.css";
import "./globals.css";
import { AppProvider } from "@/providers/app-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ソフトテニススコアキーパー",
  description: "ソフトテニスの試合スコアを記録・管理するアプリケーション",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <AppProvider>
          <div className={styles.app}>
            <Header />
            <main className={styles.main}>{children}</main>
            <Footer />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
