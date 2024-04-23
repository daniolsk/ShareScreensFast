import "@/styles/globals.css";

import { Inter } from "next/font/google";
import NavBar from "./_components/NavBar";
import { Toaster } from "@/components/ui/sonner";

import { extractRouterConfig } from "uploadthing/server";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import Link from "next/link";
import { ThemeProvider } from "./_components/ThemeProvider";

import { ClerkProvider } from "@clerk/nextjs";
import Footer from "./_components/Footer";

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
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <body
          suppressHydrationWarning={true}
          className={`font-sans ${inter.variable} flex min-h-screen flex-1 flex-col`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            {children}
            <Toaster />
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
