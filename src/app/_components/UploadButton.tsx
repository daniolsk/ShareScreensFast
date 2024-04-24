"use client";

import { useRouter } from "next/navigation";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

export default function UploadFileTile() {
  const router = useRouter();

  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onUploadBegin() {
      toast(
        <div className="flex w-full items-center gap-4">
          <Loader2 className="h-[1.2rem] w-[1.2rem] animate-spin" />
          <div className="flex w-full flex-col gap-2">
            <div>Uploading...</div>
            <Progress value={0} />
          </div>
        </div>,
        {
          duration: 100000,
          id: "upload-begin",
        },
      );
    },
    onUploadProgress(p) {
      toast(
        <div className="flex w-full items-center gap-4">
          <Loader2 className="h-[1.2rem] w-[1.2rem] animate-spin" />
          <div className="flex w-full flex-col gap-2">
            <div>Uploading...</div>
            <Progress value={p} />
          </div>
        </div>,
        {
          duration: 100000,
          id: "upload-begin",
        },
      );
    },
    onUploadError(error) {
      console.error(error);
      toast.dismiss("upload-begin");
      toast.error("Upload failed", {
        description: error.message,
      });
    },
    onClientUploadComplete() {
      toast.dismiss("upload-begin");
      toast.success("Upload complete!");

      router.refresh();
    },
  });

  return (
    <Button
      variant={"outline"}
      className="aspect-square h-full w-full rounded-xl border p-1 shadow-md transition-all hover:shadow-lg md:p-4"
    >
      <label
        htmlFor="upload-button"
        className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-4"
      >
        <Upload />
        <span className="text-center text-xs text-slate-500">
          (max file size is 16MB)
        </span>
      </label>
      <input
        id="upload-button"
        type="file"
        className="sr-only"
        {...inputProps}
      />
    </Button>
  );
}
