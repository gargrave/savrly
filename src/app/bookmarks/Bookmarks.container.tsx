"use client";
import React from "react";

import { useBookmarksStore } from "@/app/bookmarks/bookmarks.store";
import type { BkmGroup, Bookmark } from "@/app/bookmarks/bookmarks.types";
import { BkmHeader, BkmList } from "@/app/bookmarks/_components";
import { useBkmGroupsStore } from "@/app/bookmarks/bkmGroups.store";
import BkmControlBar from "@/app/bookmarks/_components/BkmControlBar";

interface Props {
  bkmGroups: BkmGroup[];
  bookmarks: Bookmark[];
}

export default function BookmarksContainer({ bkmGroups, bookmarks }: Props) {
  const setBookmarks = useBookmarksStore((state) => state.setData);
  const setBkmGroups = useBkmGroupsStore((state) => state.setData);

  React.useEffect(() => {
    setBkmGroups(bkmGroups);
  }, [bkmGroups, setBkmGroups]);

  React.useEffect(() => {
    setBookmarks(bookmarks);
  }, [bookmarks, setBookmarks]);

  return (
    <>
      <BkmHeader />
      <BkmControlBar />
      <BkmList />
    </>
  );
}
