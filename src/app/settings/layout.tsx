"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Banknote, CircleUserRound } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <main className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col md:flex-row md:p-4">
      <nav className="flex flex-row gap-4 p-4 md:flex-col">
        <Link href={"/settings/profile"} className="flex-1 md:flex-[0]">
          <Button
            variant={pathname == "/settings/profile" ? "default" : "ghost"}
            className="w-full justify-start gap-2"
          >
            <CircleUserRound size={20} />
            Profile
          </Button>
        </Link>
        <Link href={"/settings/billing"} className="flex-1 md:flex-[0]">
          <Button
            variant={pathname == "/settings/billing" ? "default" : "ghost"}
            className="w-full justify-start gap-2"
          >
            <Banknote size={20} /> Plans and Billing
          </Button>
        </Link>
      </nav>
      <section className="flex flex-1 p-4">{children}</section>
    </main>
  );
}
