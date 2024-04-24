import { redirect } from "next/navigation";
import { UserProfile } from "@clerk/nextjs";

import "./style.css";

export default async function Page() {
  return (
    <div className="flex-1">
      <div className="mb-6 gap-1">
        <h1 className="text-3xl font-semibold">Profile</h1>
        <h2 className="text-sm text-muted-foreground">Manage your profile</h2>
      </div>
      <UserProfile routing="hash" />
    </div>
  );
}
