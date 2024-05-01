"use client";

import React, { useState } from "react";
import { Loader2, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

function DeleteImageButton({
  albumId,
  handleDelete,
}: {
  albumId: number;
  handleDelete: (albumId: number, includeImages?: boolean) => Promise<void>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="flex-shrink-0 rounded-xl rounded-l-none hover:bg-destructive hover:text-destructive-foreground"
        >
          <Trash size={15} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={async (event) => {
            setIsPending(true);
            event.preventDefault();

            const formData = new FormData(event.currentTarget);

            await handleDelete(
              albumId,
              formData.get("include-images") ? true : false,
            );

            setIsOpen(false);
            setIsPending(false);
          }}
        >
          <DialogHeader>
            <DialogTitle>Delete Album</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id="include-images"
                disabled={isPending}
                name="include-images"
              />
              <Label htmlFor="include-images" className="col-span-3">
                Delete all images in the album
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button className="flex gap-2" type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 size={18} className="animate-spin" />
              ) : null}{" "}
              Delete album
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteImageButton;
