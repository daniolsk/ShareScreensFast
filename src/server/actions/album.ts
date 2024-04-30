"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "../db";
import { redirect } from "next/navigation";
import { checkSubscription } from "@/lib/subscription";
import {
  chceckIfAlbumsLimit,
  decrementAlbumsLimit,
  decrementImagesUploadLimit,
  incrementAlbumsLimit,
} from "@/lib/limits";
import { revalidatePath } from "next/cache";
import { utapi } from "@/server/uploadthing";

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

export async function deleteAlbum(albumId: number, includeImages?: boolean) {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  const isSubscribed = await checkSubscription();

  if (!isSubscribed) await decrementAlbumsLimit();

  const album = await db.album.findFirst({
    where: {
      id: albumId,
    },
  });

  if (!album) throw new Error("Album not found");
  if (album.userId !== userId) throw new Error("Unauthorized");

  if (includeImages) {
    const imagesKeys = await db.image
      .findMany({
        where: {
          albumId: albumId,
        },
        select: {
          key: true,
        },
      })
      .then((images) => images.map((image) => image.key));

    const numberOfImages = await deleteImagesInAlbum(albumId, imagesKeys);

    if (isSubscribed) {
      if (numberOfImages > 0) {
        await decrementImagesUploadLimit(numberOfImages);
      }
    }

    await db.album.delete({ where: { id: albumId } });
  } else {
    await db.album.delete({ where: { id: albumId } });
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

async function deleteImagesInAlbum(alubmId: number, imagesKeys: string[]) {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  await utapi.deleteFiles([...imagesKeys]);

  const numberOfImages = await db.image.count({
    where: {
      albumId: alubmId,
    },
  });

  await db.image.deleteMany({
    where: {
      albumId: alubmId,
    },
  });

  return numberOfImages;
}
