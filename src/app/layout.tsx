import "@/styles/globals.css";

import { Inter } from "next/font/google";
import NavBar from "./_components/NavBar";
import { Toaster } from "@/components/ui/sonner";

import { extractRouterConfig } from "uploadthing/server";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Share Screens Fast",
  description: "Share Screens Fast to everyone, anywhere",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
      <body
        className={`dark font-sans ${inter.variable} flex min-h-screen flex-1 flex-col`}
      >
        <NavBar />
        {children}
        <Toaster />
        <footer className="border-t-2 p-4 text-center text-sm">
          Made with ❤️ by{" "}
          <Link
            href="https://github.com/daniolsk"
            target="_blank"
            className="underline"
          >
            Daniel Skowron
          </Link>
        </footer>
      </body>
    </html>
  );
}
