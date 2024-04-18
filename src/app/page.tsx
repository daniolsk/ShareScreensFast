import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default async function HomePage() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user)
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-4 text-lg">
        <div>Hello to (Share Sreens Fast)</div>
        <div>
          Please{" "}
          <LoginLink className="font-semibold hover:underline">Login</LoginLink>{" "}
          to use the app!
        </div>
      </main>
    );

  return (
    <main className="flex flex-1 items-center justify-center">
      Hello to (Share Sreens Fast)
    </main>
  );
}
