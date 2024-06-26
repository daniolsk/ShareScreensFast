import Image from "next/image";
import { Loader2, LogIn } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { SignInButton, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId } = auth();

  if (userId) return redirect("/dashboard");

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-16 p-4 text-xl">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={200}
          height={200}
          className="mb-14 h-[6rem] w-[6rem] drop-shadow-xl"
        />
        <div className="text-xs italic md:text-sm">Welcome to</div>
        <div className="text-center text-4xl font-bold leading-tight tracking-tighter md:text-6xl">
          Share. Screens. Fast.
        </div>
        <div className="max-w-lg text-center text-base font-light text-foreground md:text-lg">
          Sharing photos with friends, co-workers or yourself to another device
          - it doesn&apos;t matter - it&apos;s never been faster nor easier.
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <ClerkLoading>
          <Button size={"lg"} disabled>
            <div className="flex h-full w-full items-center gap-4 p-4">
              <Loader2 className="mr-2 h-[1.2rem] w-[1.2rem] animate-spin" />
              Loading...
            </div>
          </Button>
        </ClerkLoading>
        <ClerkLoaded>
          <SignInButton mode="modal">
            <Button size={"lg"}>
              <div className="flex h-full w-full items-center gap-4 p-4">
                Sign in <LogIn className="h-[1.2rem] w-[1.2rem]" />
              </div>
            </Button>
          </SignInButton>
        </ClerkLoaded>
      </div>
    </main>
  );
}
