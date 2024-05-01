import React from "react";
import ImageComponent from "./_components/ImageComponent";
import { deleteImage, getMyImages } from "@/server/actions/image";
import UploadButton from "./_components/UploadButton";

export default async function page({
  searchParams,
}: {
  searchParams: { album?: string };
}) {
  const userImages = await getMyImages(
    searchParams.album ? searchParams.album : undefined,
  );

  return (
    <main className="flex-1">
      <div className="flex-1 p-4 md:p-6">
        <div className="grid max-h-screen grid-cols-2 items-center justify-items-center gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {userImages.map((image) => (
            <ImageComponent
              key={image.id}
              handleDelete={deleteImage}
              image={image}
            />
          ))}
          <UploadButton albumId={searchParams.album} />
        </div>
      </div>
    </main>
  );
}
