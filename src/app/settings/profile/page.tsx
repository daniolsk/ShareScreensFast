import { redirect } from "next/navigation";
import { UserProfile } from "@clerk/nextjs";

import "./style.css";

export default async function Page() {
  return (
    <div className="w-full flex-1">
      <UserProfile routing="hash" />
    </div>
  );
}
