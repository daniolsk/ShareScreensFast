import React from "react";
import { LogIn, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import { checkSubscription } from "@/lib/subscription";
import {
  UpgradeToProButton,
  ShowSubscriptionDetailsButton,
} from "../../components/StripeActionButtons";
import { getStripeRedirect } from "@/server/actions/stripe";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

async function NavBar() {
  const user = await currentUser();

  const isSubscribed = await checkSubscription();

  const handleStripeAction = async () => {
    "use server";

    await getStripeRedirect();
  };

  return (
    <div className="border-b-2">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between p-4">
        <Link
          href={"/"}
          className="flex items-center gap-4 text-xl font-semibold hover:underline"
        >
          <Image
            src="/logo.png"
            alt="logo"
            className="h-8 w-8"
            width={32}
            height={32}
          />
          <span className="hidden sm:block">Share Screens Fast</span>
        </Link>
        {!isSubscribed && user ? (
          <div>
            <UpgradeToProButton handleUpgradeToPro={handleStripeAction} />
          </div>
        ) : null}
        {user ? (
          <div className="flex items-center gap-4 text-lg">
            {isSubscribed ? (
              <Badge className="text-nowrap">Pro 🔥</Badge>
            ) : (
              <Badge variant={"outline"}>Demo</Badge>
            )}
            <UserButton showName userProfileUrl="/settings/profile" />
            <Link href="/settings/profile" className="cursor-pointer">
              <Settings className="transition-transform hover:rotate-45" />
            </Link>
          </div>
        ) : (
          <SignInButton mode="modal">
            <Button
              className="text-lg"
              style={{ padding: "0" }}
              variant={"outline"}
            >
              <div className="flex h-full w-full items-center gap-4 p-4">
                Sign in <LogIn size={20} />
              </div>
            </Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
}

export default NavBar;
