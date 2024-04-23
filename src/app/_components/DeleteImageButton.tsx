"use client";

import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Loader2, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

function DeleteImageButton({
  imageId,
  imageKey,
  handleDelete,
}: {
  imageId: number;
  imageKey: string;
  handleDelete: (imageId: number, imageKey: string) => Promise<void>;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="flex w-full flex-1 items-center gap-2"
          variant={"destructive"}
        >
          <Trash className="h-[1rem] w-[1rem] flex-shrink-0" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            image from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              toast(
                <div className="flex items-center gap-2">
                  <Loader2 className="h-[1.2rem] w-[1.2rem] animate-spin" />{" "}
                  <span>Deleting...</span>
                </div>,
                {
                  duration: 100000,
                  id: "delete-begin",
                },
              );

              await handleDelete(imageId, imageKey);

              toast.dismiss("delete-begin");
              toast.success("Image deleted!");
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteImageButton;
