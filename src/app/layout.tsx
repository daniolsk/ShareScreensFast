import "@/styles/globals.css";

import { Inter } from "next/font/google";
import NavBar from "./_components/NavBar";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Share Screens Fast",
  description: "Share Screens Fast to everyone, anywhere",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`dark font-sans ${inter.variable} flex min-h-screen flex-1 flex-col`}
      >
        <NavBar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
