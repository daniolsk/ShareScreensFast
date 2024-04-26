import "server-only";

import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import { utapi } from "@/server/uploadthing";
import { decrementLimit } from "@/lib/limits";
import { checkSubscription } from "@/lib/subscription";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getMyImages() {
  const user = await currentUser();

  if (!user) throw new Error("Unauthorized");

  const images = await db.image.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return images;
}

export async function getImage(id: number) {
  const image = await db.image.findFirst({
    where: {
      id: id,
    },
  });

  return image;
}

export async function deleteImage(id: number, imageKey: string) {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  await utapi.deleteFiles(imageKey);

  const isSubscribed = await checkSubscription();

  if (!isSubscribed) await decrementLimit();

  const image = await db.image.findFirst({
    where: {
      id: id,
    },
  });

  if (!image) throw new Error("Image not found");
  if (image.userId !== userId) throw new Error("Unauthorized");

  await db.image.delete({ where: { id: id } });

  revalidatePath("/");
}
