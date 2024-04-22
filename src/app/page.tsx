import Link from "next/link";
import UploadButton from "./_components/UploadButton";
import { deleteImage, getMyImages } from "@/server/actions/image";
import DeleteImageButton from "./_components/DeleteImageButton";
import Image from "next/image";
import { auth, currentUser } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";
import { stripe } from "@/server/stripe";
import { db } from "@/server/db";

export default async function HomePage() {
  const { userId } = auth();

  const handleDelete = async (imageId: number, imageKey: string) => {
    "use server";

    await deleteImage(imageId, imageKey);
  };

  if (!userId)
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-4 text-xl">
        <div>
          Hello to{" "}
          <span className="font-semibold italic">Share Sreens Fast</span>
        </div>
        <div>
          Please{" "}
          <SignInButton mode="modal">
            <span className="cursor-pointer font-semibold hover:underline">
              Login
            </span>
          </SignInButton>{" "}
          to use the app!
        </div>
      </main>
    );

  const userImages = await getMyImages();

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-7xl flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-3 items-center justify-items-center gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
          {userImages.map((image) => (
            <div
              key={image.id}
              className="relative h-full w-full rounded-xl border-2"
            >
              <DeleteImageButton
                imageKey={image.key}
                handleDelete={handleDelete}
                imageId={image.id}
              />
              <Link
                className="flex h-full w-full items-center justify-center overflow-hidden p-4 shadow-lg hover:bg-slate-900"
                href={`/img/${image.id}`}
              >
                <Image
                  className="aspect-square object-cover"
                  src={image.url}
                  width={150}
                  height={150}
                  alt="image"
                />
              </Link>
            </div>
          ))}
          <UploadButton />
        </div>
      </div>
    </main>
  );
}
