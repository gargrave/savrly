"use client";

import React from "react";

import { useAsync, useMountEffect } from "@react-hookz/web";

import { fetchAll } from "@/lib/api/api";
import { Spinner } from "@/lib/components";
import type { BkmGroup, Bookmark } from "./bookmarks.types";
import { BkmControlBar, BkmHeader, BkmList } from "./_components";
import { useBkmGroupsStore, useBookmarksStore } from "./_store";

// TODO: add a version number display
export default function BookmarksContainer() {
  const setBookmarks = useBookmarksStore((state) => state.setData);
  const setBkmGroups = useBkmGroupsStore((state) => state.setData);

  const [dataFetchState, dataFetchFn] = useAsync(async () =>
    Promise.all([
      fetchAll<Bookmark>("bookmarks"),
      fetchAll<BkmGroup>("bkmGroups"),
    ])
  );

  React.useEffect(() => {
    if (Array.isArray(dataFetchState.result)) {
      const [bookmarks = [], bkmGroups = []] = dataFetchState.result;
      setBookmarks(bookmarks);
      setBkmGroups(bkmGroups);
    }
  }, [dataFetchState.result, setBkmGroups, setBookmarks]);

  useMountEffect(() => {
    dataFetchFn.execute();
  });

  const isLoading =
    dataFetchState.status === "not-executed" ||
    dataFetchState.status === "loading";

  return (
    <>
      <BkmHeader />
      <BkmControlBar />
      <BkmList />
      {/* TODO: make a better loader */}
      {isLoading && <Spinner />}
    </>
  );
}
