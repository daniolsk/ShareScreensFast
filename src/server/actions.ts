import "server-only";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/server/db";
import { redirect } from "next/navigation";
import { utapi } from "@/server/uploadthing";

const { getUser } = getKindeServerSession();

export async function getMyImages() {
  const user = await getUser();

  if (!user) throw new Error("Unauthorized");

  const images = await db.image.findMany({
    where: {
      userId: user.id,
    },
  });

  return images;
}

export async function getImage(id: number) {
  const user = await getUser();

  if (!user) throw new Error("Unauthorized");

  const image = await db.image.findFirst({
    where: {
      id: id,
    },
  });

  if (!image) throw new Error("Image not found");
  if (image.userId !== user.id) throw new Error("Unauthorized");

  return image;
}

export async function deleteImage(id: number, imageKey: string) {
  const user = await getUser();

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
