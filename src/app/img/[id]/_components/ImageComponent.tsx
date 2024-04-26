"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function ImageComponent({ imageUrl }: { imageUrl: string }) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="flex flex-[3] items-stretch rounded-xl border-2 p-4">
      <Link
        href={imageUrl}
        target="_blank"
        className="relative flex flex-1 items-center justify-center overflow-hidden rounded-xl"
      >
        {isLoading ? (
          <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center rounded-xl bg-muted/50">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : null}
        <Image
          fill
          quality={100}
          priority
          src={imageUrl}
          alt="image"
          onLoad={() => setIsLoading(false)}
          className={`rounded-xl object-cover ${isLoading ? "animate-pulse blur-xl" : "animate-none blur-0"}`}
        />
      </Link>
    </div>
  );
}
