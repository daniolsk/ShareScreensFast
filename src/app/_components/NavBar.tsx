import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LogOut, LogIn } from "lucide-react";

import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

async function NavBar() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

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
            Hello <span className="font-semibold">{user.given_name}</span>
          </div>
          <Button
            className="text-lg"
            style={{ padding: "0" }}
            variant={"outline"}
          >
            <LogoutLink className="h-full w-full p-2">
              <LogOut size={20} />
            </LogoutLink>
          </Button>
        </div>
      ) : (
        <Button
          className="text-lg"
          style={{ padding: "0" }}
          variant={"outline"}
        >
          <LoginLink className="flex h-full w-full items-center gap-4 p-4">
            Sign in <LogIn size={20} />
          </LoginLink>
        </Button>
      )}
    </div>
  );
}

export default NavBar;
