import "server-only";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import { redirect } from "next/navigation";
import { utapi } from "@/server/uploadthing";

export async function getMyImages() {
  const user = await currentUser();

  if (!user) throw new Error("Unauthorized");

  const images = await db.image.findMany({
    where: {
      userId: user.id,
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

  if (!image) throw new Error("Image not found");

  return image;
}

export async function deleteImage(id: number, imageKey: string) {
  const user = await currentUser();

  if (!user) throw new Error("Unauthorized");

  await utapi.deleteFiles(imageKey);

  const image = await db.image.findFirst({
    where: {
      id: id,
    },
  });

  if (!image) throw new Error("Image not found");
  if (image.userId !== user.id) throw new Error("Unauthorized");

  await db.image.delete({ where: { id: id } });

  redirect("/");
}
