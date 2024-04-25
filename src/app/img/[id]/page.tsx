import { deleteImage, getImage } from "@/server/actions/image";
import Link from "next/link";
import React from "react";
import OptionsButtons from "./_components/OptionsButtons";

export default async function page({ params }: { params: { id: string } }) {
  const image = await getImage(parseInt(params.id));

  const handleDelete = async (imageId: number, imageKey: string) => {
    "use server";

    await deleteImage(imageId, imageKey);
  };

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4 overflow-hidden p-4 lg:flex-row">
      <div className="flex flex-[3] items-center justify-center rounded-xl border-2 p-4">
        <Link href={image.url} target="_blank">
          {/*eslint-disable-next-line @next/next/no-img-element*/}
          <img
            src={image.url}
            alt="image"
            className="max-h-[75vh] rounded-xl object-contain"
          />
        </Link>
      </div>
      <div className="flex flex-col gap-4 overflow-hidden rounded-xl border-2 p-4 px-4 md:flex-1">
        <div>
          <div className="text-sm text-slate-500">Name</div>
          <div className="truncate text-lg font-semibold">{image.name}</div>
        </div>
        <div>
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
