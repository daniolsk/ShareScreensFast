"use client";

import React from "react";
import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";

function UploadFileTile() {
  const router = useRouter();

  return (
    <div className="flex h-40 w-40 items-center justify-center">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
          router.refresh();
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}

export default UploadFileTile;
