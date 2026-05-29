import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CompareBar } from "@/components/colleges/CompareBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "CollegeFind — Discover Your Perfect College", template: "%s | CollegeFind" },
  description: "Find, compare, and decide on the best colleges in India. Search by entrance exam, location, fees, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CompareBar />
      </body>
    </html>
  );
}
