import { UPLOAD_IMAGE_LIMIT, ALBUMS_LIMIT } from "@/constants/uploadImageLimit";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";

export const chceckIfImagesUploadLimit = async (imagesToUpload: number) => {
  const { userId } = auth();

  if (!userId) return false;

  let limitFromDb = await db.userImageUploadLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!limitFromDb) {
    limitFromDb = await db.userImageUploadLimit.create({
      data: {
        userId,
        uploadedImages: 0,
      },
    });
  }

  if (limitFromDb?.uploadedImages + imagesToUpload > UPLOAD_IMAGE_LIMIT) {
    return true;
  }

  return false;
};

export const incrementImagesUploadLimit = async (imagesToUpload: number) => {
  const { userId } = auth();

  if (!userId) return false;

  const limitFromDb = await db.userImageUploadLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!limitFromDb) {
    await db.userImageUploadLimit.create({
      data: {
        userId,
        uploadedImages: imagesToUpload,
      },
    });
  } else {
    await db.userImageUploadLimit.update({
      where: {
        userId,
      },
      data: {
        uploadedImages: limitFromDb.uploadedImages + imagesToUpload,
      },
    });
  }
};

export const decrementImagesUploadLimit = async () => {
  const { userId } = auth();

  if (!userId) return;

  const limitFromDb = await db.userImageUploadLimit.findUnique({
    where: {
      userId,
    },
  });

  await db.userImageUploadLimit.update({
    where: {
      userId,
    },
    data: {
      uploadedImages: limitFromDb!.uploadedImages - 1,
    },
  });
};

export const chceckIfAlbumsLimit = async () => {
  const { userId } = auth();

  if (!userId) return false;

  let limitFromDb = await db.userAlbumLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!limitFromDb) {
    limitFromDb = await db.userAlbumLimit.create({
      data: {
        userId,
        createdAlbums: 0,
      },
    });

    return false;
  }

  if (limitFromDb.createdAlbums + 1 > ALBUMS_LIMIT) {
    return true;
  }

  return false;
};

export const incrementAlbumsLimit = async () => {
  const { userId } = auth();

  if (!userId) return false;

  const limitFromDb = await db.userAlbumLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!limitFromDb) {
    await db.userAlbumLimit.create({
      data: {
        userId,
        createdAlbums: 0,
      },
    });
  } else {
    await db.userAlbumLimit.update({
      where: {
        userId,
      },
      data: {
        createdAlbums: limitFromDb.createdAlbums + 1,
      },
    });
  }
};

export const decrementAlbumsLimit = async () => {
  const { userId } = auth();

  if (!userId) return;

  const limitFromDb = await db.userAlbumLimit.findUnique({
    where: {
      userId,
    },
  });

  await db.userAlbumLimit.update({
    where: {
      userId,
    },
    data: {
      createdAlbums: limitFromDb!.createdAlbums - 1,
    },
  });
};
