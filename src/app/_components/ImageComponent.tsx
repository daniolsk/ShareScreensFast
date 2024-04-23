"use client";

import { type Image as ImageType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DeleteImageButton from "./DeleteImageButton";
import { Button } from "@/components/ui/button";
import { Share2, Trash } from "lucide-react";
import { toast } from "sonner";

function ImageComponent({
  image,
  handleDelete,
}: {
  image: ImageType;
  handleDelete: (imageId: number, imageKey: string) => Promise<void>;
}) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 p-2 shadow-md transition-all hover:shadow-lg">
      <Link
        href={`/img/${image.id}`}
        className="flex aspect-square h-full w-full flex-1 items-center justify-center"
      >
        <div className="flex items-center justify-center">
          <Image
            className="aspect-square w-full rounded-xl object-cover"
            src={image.url}
            width={150}
            height={150}
            alt="image"
          />
        </div>
      </Link>
      <div className="flex w-full gap-2">
        <Button
          variant={"outline"}
          className="flex-1"
          onClick={async () => {
            await navigator.clipboard.writeText(
              window.location.href + `img/${image.id}`,
            );
            toast("Link copied to clipboard!");
          }}
        >
          <Share2 className="h-[1rem] w-[1rem]" />
        </Button>
        <DeleteImageButton
          imageKey={image.key}
          handleDelete={handleDelete}
          imageId={image.id}
        />
      </div>
    </div>
  );
}

export default ImageComponent;
