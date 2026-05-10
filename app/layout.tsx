import type { Metadata } from "next";
import "./globals.css";

import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Campus Marketplace Đà Lạt",
  description:
    "Mua bán đồ dùng học tập và sinh hoạt cho sinh viên Đà Lạt. Tìm theo mã học phần và chuyên ngành.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <main className="container py-8">{children}</main>
        <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
          Campus Marketplace © 2026 · Đà Lạt
        </footer>
      </body>
    </html>
  );
}
