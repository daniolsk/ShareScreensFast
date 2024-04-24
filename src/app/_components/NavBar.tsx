import React from "react";
import { Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import { checkSubscription } from "@/lib/subscription";
import { UpgradeToProNavButton } from "../../components/StripeActionButtons";
import { getStripeRedirect } from "@/server/actions/stripe";
import ThemeToggler from "./ThemeToggler";
import Logo from "./Logo";

async function NavBar() {
  const user = await currentUser();

  const isSubscribed = await checkSubscription();

  return (
    <div>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between p-4 md:p-6">
        <Logo />
        {user ? (
          <div className="flex items-center gap-2 text-lg">
            {isSubscribed ? (
              <Badge className="text-nowrap">Pro 🔥</Badge>
            ) : (
              <UpgradeToProNavButton handleUpgradeToPro={getStripeRedirect} />
            )}
            <Link href="/settings/profile" className="cursor-pointer">
              <Button variant={"ghost"} size="icon">
                <Settings className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </Link>
            <ThemeToggler />
            <div className="flex w-[40px] items-center justify-center">
              <UserButton
                afterSignOutUrl="/"
                userProfileUrl="/settings/profile"
              />
            </div>
          </div>
        ) : (
          <div className="flex h-[40px] w-[40px] items-center justify-center">
            <ThemeToggler />
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
