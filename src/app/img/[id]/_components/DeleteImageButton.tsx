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
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function DeleteImageButton({
  imageId,
  imageKey,
  handleDelete,
}: {
  imageId: number;
  imageKey: string;
  handleDelete: (
    imageId: number,
    imageKey: string,
    path?: string,
  ) => Promise<void>;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} className="flex-1">
          <div role="div">Delete</div>
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

              await handleDelete(imageId, imageKey, "/dashboard");

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
