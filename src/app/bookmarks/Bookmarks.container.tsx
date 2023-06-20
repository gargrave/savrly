"use client";
import React from "react";

import { useBookmarksApi } from "@/app/bookmarks/_components/hooks";
import { useBkmGroupsApi } from "@/app/bookmarks/_components/bkmGroups/hooks";
import { Spinner } from "@/lib/components";
import { useToasty } from "@/lib/hooks";
import { BkmControlBar, BkmHeader, BkmList } from "./_components";
import { useBkmGroupsStore, useBookmarksStore } from "./_store";

type AppState = "initial" | "loading" | "ready";

// TODO: add a version number display
export default function BookmarksContainer() {
  const { errorToast } = useToasty();
  const [appState, setAppState] = React.useState<AppState>("initial");
  const [resourcesLoaded, setResourcesLoaded] = React.useState(0);

  const setBookmarks = useBookmarksStore((state) => state.setData);
  const setBkmGroups = useBkmGroupsStore((state) => state.setData);

  const isLoading = resourcesLoaded < 2;

  const { fetchBookmarks } = useBookmarksApi();
  const { fetchGroups } = useBkmGroupsApi();

  // TODO: move to useBookmarksUiFns
  const loadBookmarks = React.useCallback(() => {
    fetchBookmarks({
      onError: () => {
        errorToast({
          title: "Error fetching Bookmarks...",
        });
      },
      onSuccess: (bookmarks) => {
        setBookmarks(bookmarks);
        setResourcesLoaded((prev) => prev + 1);
      },
    });
  }, [errorToast, fetchBookmarks, setBookmarks]);

  const loadGroups = React.useCallback(() => {
    fetchGroups({
      onError: () => {
        errorToast({
          title: "Error fetching Groups...",
        });
      },
      onSuccess: (groups) => {
        setBkmGroups(groups);
        setResourcesLoaded((prev) => prev + 1);
      },
    });
  }, [errorToast, fetchGroups, setBkmGroups]);

  React.useEffect(() => {
    if (appState === "initial") {
      setAppState("loading");
      loadBookmarks();
      loadGroups();
    }
  }, [appState, loadBookmarks, loadGroups]);

  React.useEffect(() => {
    if (resourcesLoaded >= 2) {
      setAppState("ready");
    }
  }, [resourcesLoaded]);

  return (
    <>
      <BkmHeader />
      <BkmControlBar />
      {isLoading ? (
        <div className={"min-h-[100vh]"}>
          <Spinner asOverlay size={"xl"} />
        </div>
      ) : (
        <BkmList />
      )}
    </>
  );
}
