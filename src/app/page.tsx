import Link from "next/link";
import UploadButton from "./_components/UploadButton";
import { deleteImage, getMyImages } from "@/server/actions/image";
import DeleteImageButton from "./_components/DeleteImageButton";
import Image from "next/image";
import { Loader2, LogIn } from "lucide-react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { SignInButton, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { stripe } from "@/server/stripe";
import { db } from "@/server/db";
import { Button } from "@/components/ui/button";
import ImageComponent from "./_components/ImageComponent";

export default async function HomePage() {
  const { userId } = auth();

  const handleDelete = async (imageId: number, imageKey: string) => {
    "use server";

    await deleteImage(imageId, imageKey);
  };

  if (!userId)
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-16 p-4 text-xl">
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs md:text-sm">Welcome to</div>
          <div className="text-center text-4xl font-bold leading-tight tracking-tighter md:text-6xl">
            Share. Sreens. Fast.
          </div>
          <div className="max-w-lg text-center text-base font-light text-foreground md:text-lg">
            Sharing photos with friends, co-workers or yourself to another
            device - it doesn&apos;t matter - it&apos;s never been faster nor
            easier.
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
          <div className="pt-2 text-xs italic text-secondary-foreground">
            *it takes only couple of seconds
          </div>
        </div>
      </main>
    );

  const userImages = await getMyImages();

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-7xl flex-1 p-4">
        <div className="grid grid-cols-2 items-center justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {userImages.map((image) => (
            <ImageComponent
              key={image.id}
              handleDelete={handleDelete}
              image={image}
            />
          ))}
          <UploadButton />
        </div>
      </div>
    </main>
  );
}
