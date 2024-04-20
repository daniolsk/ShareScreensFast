"use client";

import { useRouter } from "next/navigation";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import LoadingSpinnerSVG from "./LoadingSpinner";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

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
        <div className="flex w-full items-center gap-4 text-white">
          <LoadingSpinnerSVG />
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
        <div className="flex w-full items-center gap-4 text-white">
          <LoadingSpinnerSVG />
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
    <div className="aspect-square h-full w-full rounded-xl border-2 bg-slate-900 shadow-lg hover:bg-slate-800">
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
    </div>
  );
}
