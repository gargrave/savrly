"use client";
import React from "react";

import type { BkmGroup, Bookmark } from "./bookmarks.types";
import { BkmControlBar, BkmHeader, BkmList } from "./_components";
import { useBkmGroupsStore, useBookmarksStore } from "./_store";

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
