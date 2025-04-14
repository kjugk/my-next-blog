import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/navigation/header/Header";

export const metadata: Metadata = {
  title: "My Next Blog",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`font-body`}>
        <div className="h-dvh flex flex-col">
          {/* TODO: Admin 用のレイアウトを作成して、Header を分離する */}
          <Header />
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
