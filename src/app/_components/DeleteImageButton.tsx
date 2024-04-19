"use client";

import { Trash } from "lucide-react";
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
      <AlertDialogTrigger className="absolute right-1 top-1 cursor-pointer rounded-xl bg-slate-900/90 p-1.5 shadow-lg hover:bg-slate-800/90">
        <Trash size={18} />
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
          <AlertDialogAction onClick={() => handleDelete(imageId, imageKey)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteImageButton;
