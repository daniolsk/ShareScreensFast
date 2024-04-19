import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LogOut, LogIn } from "lucide-react";

import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";

async function NavBar() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  return (
    <div className="flex w-full justify-between border-b-2 p-4">
      <Link
        href={"/"}
        className="flex items-center gap-4 text-xl font-semibold"
      >
        <img src="/logo.png" alt="logo" className="h-8 w-8" />
        <span>Share Screens Fast</span>
      </Link>
      {user ? (
        <div className="flex items-center gap-4 text-lg">
          <div className="hidden sm:block">
            Hello <span className="font-semibold">{user.given_name}</span>
          </div>
          <LogoutLink>
            <LogOut />
          </LogoutLink>
        </div>
      ) : (
        <div className="text-lg">
          <LoginLink className="flex items-center gap-4 hover:underline">
            Sign up <LogIn />
          </LoginLink>
        </div>
      )}
    </div>
  );
}

export default NavBar;
