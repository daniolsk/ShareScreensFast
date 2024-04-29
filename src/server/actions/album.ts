"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "../db";
import { redirect } from "next/navigation";
import { checkSubscription } from "@/lib/subscription";
import {
  chceckIfAlbumsLimit,
  decrementAlbumsLimit,
  incrementAlbumsLimit,
} from "@/lib/limits";
import { revalidatePath } from "next/cache";

export async function getMyAlbums() {
  const user = await currentUser();

  if (!user) throw new Error("Unauthorized");

  const images = await db.album.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return images;
}

export async function addAlbum(name: string) {
  const user = await currentUser();

  if (!user) throw new Error("Unauthorized");

  const isSubscribed = await checkSubscription();

  if (!isSubscribed) {
    if (await chceckIfAlbumsLimit()) {
      return { error: "Album limit reached" };
    }

    await incrementAlbumsLimit();
  }

  const album = await db.album.create({
    data: {
      userId: user.id,
      name: name,
    },
  });

  redirect(`/dashboard?album=${album.id}`);
}

export async function deleteAlbum(id: number, includeImages?: boolean) {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  const isSubscribed = await checkSubscription();

  if (!isSubscribed) await decrementAlbumsLimit();

  const album = await db.album.findFirst({
    where: {
      id: id,
    },
  });

  if (!album) throw new Error("Album not found");
  if (album.userId !== userId) throw new Error("Unauthorized");

  if (includeImages) {
    const albumDelete = db.album.delete({ where: { id: id } });
    const imagesDelete = db.image.deleteMany({ where: { albumId: id } });

    await db.$transaction([albumDelete, imagesDelete]);
  } else {
    await db.album.delete({ where: { id: id } });
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
