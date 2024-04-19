import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LogOut, LogIn } from "lucide-react";

import {
  RegisterLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

async function NavBar() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  return (
    <div className="flex w-full justify-between border-b-2 p-4">
      <div className="text-xl font-semibold">Share Screens Fast</div>
      {user ? (
        <div className="flex items-center gap-4 text-lg">
          <div>
            Hello <span className="font-semibold">{user.given_name}</span>
          </div>
          <LogoutLink>
            <LogOut />
          </LogoutLink>
        </div>
      ) : (
        <div className="text-lg">
          <RegisterLink className="flex items-center gap-4 hover:underline">
            Sign up <LogIn />
          </RegisterLink>
        </div>
      )}
    </div>
  );
}

export default NavBar;
