import { redirect } from "next/navigation";
import { UserProfile } from "@clerk/nextjs";

import "./style.css";

export default async function Page() {
  return (
    <div className="h-full w-full">
      <UserProfile routing="hash" />
    </div>
  );
}
