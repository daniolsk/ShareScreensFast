"use client";

import { type Image as ImageType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import DeleteImageButton from "./DeleteImageButton";
import { Button } from "@/components/ui/button";
import { Loader2, Share2 } from "lucide-react";
import { toast } from "sonner";

function ImageComponent({
  image,
  handleDelete,
}: {
  image: ImageType;
  handleDelete: (imageId: number, imageKey: string) => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border p-2 shadow-md transition-all hover:shadow-lg">
      <Link
        href={`/img/${image.id}`}
        className="flex aspect-square h-full w-full flex-1 items-stretch justify-stretch"
      >
        <div className="relative flex items-stretch justify-stretch overflow-hidden rounded-xl">
          {isLoading ? (
            <div className="absolute left-0 top-0 z-10 flex h-full w-full animate-pulse items-center justify-center rounded-xl bg-muted/50">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : null}
          <Image
            className={`aspect-square h-full w-full rounded-xl object-cover ${isLoading ? "animate-pulse blur-xl" : "animate-none blur-0"}`}
            src={image.url}
            priority
            width={250}
            height={250}
            onLoad={() => {
              setIsLoading(false);
            }}
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
