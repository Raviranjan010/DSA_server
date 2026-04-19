import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ChatBot from "@/components/ai/ChatBot";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DevForge DSA | Master Data Structures & Algorithms",
  description: "A premium, beginner-to-advanced platform for mastering DSA, featuring interactive coding, AI assistance, and high-quality structured content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable}`}
    >
      <body>
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
