import { deleteImage, getImage } from "@/server/actions";
import Link from "next/link";
import React from "react";
import OptionsButtons from "./_components/OptionsButtons";
import Image from "next/image";

export default async function page({ params }: { params: { id: string } }) {
  const image = await getImage(parseInt(params.id));

  const handleDelete = async (imageId: number, imageKey: string) => {
    "use server";

    await deleteImage(imageId, imageKey);
  };

  return (
    <main className="flex flex-1 flex-col overflow-hidden md:flex-row">
      <div className="flex flex-[2] items-center justify-center p-4">
        <Link href={image.url} target="_blank">
          <img
            src={image.url}
            alt="image"
            className="max-h-[75vh] object-contain"
          />
        </Link>
      </div>
      <div className="flex flex-col overflow-hidden border-t-2 md:flex-1 md:border-l-2">
        <div className="border-b-2 p-4">
          <div className="text-sm text-slate-500">Name</div>
          <div className="truncate text-lg font-semibold">{image.name}</div>
        </div>
        <div className="border-b-2 p-4">
          <div className="text-sm text-slate-500">Created At</div>
          <div className="truncate text-lg font-semibold">
            {image.createdAt.toLocaleString()}
          </div>
        </div>
        <div className="flex-1"></div>
        <OptionsButtons image={image} handleDelete={handleDelete} />
      </div>
    </main>
  );
}
