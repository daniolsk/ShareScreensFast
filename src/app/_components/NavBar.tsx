import React from "react";
import { LogOut, LogIn } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";

async function NavBar() {
  const user = await currentUser();

  return (
    <div className="flex w-full justify-between border-b-2 p-4">
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
      {user ? (
        <div className="flex items-center gap-4 text-lg">
          <div>
            Hello <span className="font-semibold">{user.firstName}</span>
          </div>
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
