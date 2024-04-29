"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function AddAlbumButton({
  addAlbum,
}: {
  addAlbum: (name: string) => Promise<{ error: string } | void>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button
          className="flex h-full w-full flex-1 items-center gap-2"
          variant={"outline"}
        >
          <Plus className="h-[1rem] w-[1rem] flex-shrink-0" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={async (event) => {
            setIsPending(true);
            event.preventDefault();

            const formData = new FormData(event.currentTarget);

            const error = await addAlbum(formData.get("name") as string);

            if (error) {
              toast.error(error.error);
              setIsPending(false);
              setIsOpen(false);
              return;
            }

            toast("Album created!");

            setIsOpen(false);
            setIsPending(false);
          }}
        >
          <DialogHeader>
            <DialogTitle>Add Album</DialogTitle>
            <DialogDescription>
              Please provide a name for your new album.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                disabled={isPending}
                id="name"
                name="name"
                required
                defaultValue="New Album"
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button className="flex gap-2" disabled={isPending} type="submit">
              {isPending ? (
                <Loader2 size={18} className="animate-spin" />
              ) : null}{" "}
              Add Album
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddAlbumButton;
