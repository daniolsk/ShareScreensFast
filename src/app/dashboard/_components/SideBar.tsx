"use client";

import { Button } from "@/components/ui/button";
import { type Album as AlbumType } from "@prisma/client";
import { Album } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import AddAlbumButton from "./AddAlbumButton";
import DeleteAlbumButton from "./DeleteAlbumButton";
import { deleteAlbum } from "@/server/actions/album";

export default function SideBar({
  albums,
  addAlbum,
}: {
  albums: AlbumType[];
  addAlbum: (name: string) => Promise<void>;
}) {
  const query = useSearchParams();

  return (
    <div className="flex min-w-[200px] flex-row items-center overflow-x-auto p-4 md:flex-col md:p-6">
      <Button
        asChild
        variant={!query.get("album") ? "default" : "ghost"}
        className="justify-start md:w-full"
      >
        <Link href="/dashboard">All images</Link>
      </Button>
      <div className="w-full border-r-2 px-2 md:border-b-2 md:border-r-0 md:py-2"></div>
      <div className="flex w-full flex-row gap-2 md:flex-col">
        <div className="flex items-center justify-center gap-2 px-4 text-xs text-muted-foreground md:py-4">
          <Album size={14} /> <span className="hidden md:block">Albums</span>
        </div>
        <div className="flex max-w-full flex-row gap-2 md:flex-col">
          {albums.map((album) => (
            <div
              key={album.id}
              className="flex gap-2 rounded-xl border-2 p-1 md:border-0 md:p-0"
            >
              <Button
                className="w-full justify-start"
                asChild
                variant={
                  query.get("album") === album.id.toString()
                    ? "default"
                    : "ghost"
                }
              >
                <Link href={`/dashboard?album=${album.id}`}>{album.name}</Link>
              </Button>
              <DeleteAlbumButton
                albumId={album.id}
                handleDelete={deleteAlbum}
              />
            </div>
          ))}
          <AddAlbumButton addAlbum={addAlbum} />
        </div>
      </div>
    </div>
  );
}
