"use client";

import DeleteImageButton from "./DeleteImageButton";
import { Button } from "@/components/ui/button";
import type { Image } from "@prisma/client";
import React from "react";
import { toast } from "sonner";

function OptionsButtons({
  image,
  handleDelete,
}: {
  image: Image;
  handleDelete: (imageId: number, imageKey: string) => Promise<void>;
}) {
  return (
    <div className="flex gap-4">
      <Button
        variant={"outline"}
        className="flex-1"
        onClick={async () => {
          await navigator.clipboard.writeText(window.location.href);
          toast("Link copied to clipboard!");
        }}
      >
        Share Link
      </Button>
      <DeleteImageButton
        imageId={image.id}
        imageKey={image.key}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default OptionsButtons;
