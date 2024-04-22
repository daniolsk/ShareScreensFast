import React from "react";
import { LogOut, LogIn } from "lucide-react";
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
} from "./UpgradeToProButton";
import { getStripeRedirect } from "@/server/actions/stripe";

async function NavBar() {
  const user = await currentUser();

  const isSubscribed = await checkSubscription();

  const handleUpgradeToPro = async () => {
    "use server";

    await getStripeRedirect();
  };

  return (
    <div className="flex w-full items-center justify-between border-b-2 p-4">
      <Link
        href={"/"}
        className="flex items-center gap-4 text-xl font-semibold"
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
      {!isSubscribed ? (
        <div>
          <UpgradeToProButton handleUpgradeToPro={handleUpgradeToPro} />
        </div>
      ) : (
        <div>
          <ShowSubscriptionDetailsButton
            handleUpgradeToPro={handleUpgradeToPro}
          />
        </div>
      )}
      {user ? (
        <div className="flex items-center gap-4 text-lg">
          <div>
            Hello <span className="font-semibold">{user.firstName}</span>
          </div>
          {isSubscribed ? (
            <Badge>Pro</Badge>
          ) : (
            <Badge variant={"outline"}>Demo</Badge>
          )}
          <UserButton />
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
  );
}

export default NavBar;
