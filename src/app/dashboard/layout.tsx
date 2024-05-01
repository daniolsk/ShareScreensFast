import { getMyAlbums } from "@/server/actions/album";
import React from "react";
import SideBar from "./_components/SideBar";
import { addAlbum } from "@/server/actions/album";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userAlbums = await getMyAlbums();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col md:flex-row">
      <SideBar addAlbum={addAlbum} albums={userAlbums} />
      {children}
    </div>
  );
}
