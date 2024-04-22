import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import { checkIfLimit, incrementLimit } from "@/lib/limits";
import { checkSubscription } from "@/lib/subscription";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "16MB", maxFileCount: 5 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ files }) => {
      files.forEach((file) => {
        if (file.size > 16 * 1024 * 1024) {
          throw new UploadThingError("File is too large");
        }
      });
      // This code runs on your server before upload
      const { userId } = auth();

      // If you throw, the user will not be able to upload
      if (!userId) throw new UploadThingError("Unauthorized");

      const isSubscribed = await checkSubscription();

      if (!isSubscribed) {
        if (await checkIfLimit(files.length)) {
          throw new UploadThingError("Upload limit reached!");
        }

        await incrementLimit(files.length);
      }

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      await db.image.create({
        data: {
          url: file.url,
          userId: metadata.userId,
          name: file.name,
          key: file.key,
        },
      });

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
