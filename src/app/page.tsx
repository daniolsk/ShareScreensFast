import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import UploadButton from "./_components/UploadButton";
import { deleteImage, getMyImages } from "@/server/actions";
import DeleteImageButton from "./_components/DeleteImageButton";
import Image from "next/image";

export default async function HomePage() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const handleDelete = async (imageId: number, imageKey: string) => {
    "use server";

    await deleteImage(imageId, imageKey);
  };

  if (!user)
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-4 text-xl">
        <div>
          Hello to{" "}
          <span className="font-semibold italic">Share Sreens Fast</span>
        </div>
        <div>
          Please{" "}
          <LoginLink className="font-semibold hover:underline">Login</LoginLink>{" "}
          to use the app!
        </div>
      </main>
    );

  const userImages = await getMyImages();

  return (
    <main className="flex-1 overflow-y-auto p-4">
      <div className="grid grid-cols-3 items-center justify-items-center gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
        {userImages.map((image) => (
          <div
            key={image.id}
            className="relative h-full w-full rounded-xl border-2 "
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
    </main>
  );
}
