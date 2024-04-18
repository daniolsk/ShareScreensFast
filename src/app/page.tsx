import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { db } from "@/server/db";
import Link from "next/link";
import UploadFileTile from "./_components/UploadFileTile";

export default async function HomePage() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const userImages = await db.image.findMany({
    where: {
      userId: user?.id,
    },
  });

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
    <main className="flex flex-1 p-4">
      <div className="flex flex-wrap gap-4">
        {userImages.map((image) => (
          <Link key={image.id} target="_blank" href={image.url}>
            <img className="h-40 w-40 object-cover" src={image.url} />
          </Link>
        ))}
        <UploadFileTile />
      </div>
    </main>
  );
}
