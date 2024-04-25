import { UserProfile } from "@clerk/nextjs";

import "./style.css";

export default async function Page() {
  return (
    <div className="flex w-full flex-col">
      <UserProfile routing="hash" />
    </div>
  );
}
