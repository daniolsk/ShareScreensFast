import { UPLOAD_IMAGE_LIMIT } from "@/constants/uploadImageLimit";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";

export const checkIfLimit = async (imagesToUpload: number) => {
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

export const incrementLimit = async (imagesToUpload: number) => {
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

export const decrementLimit = async () => {
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
