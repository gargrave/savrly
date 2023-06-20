import React from "react";

import { useBookmarksApi } from "./useBookmarksApi";
import { useToasty } from "@/lib/hooks";
import { useBookmarksStore } from "@/app/bookmarks/_store";
import { randomAffirmation } from "@/lib/utils";

export function useBookmarksUiFns() {
  const { errorToast, successToast } = useToasty();

  const removeBookmark = useBookmarksStore((state) => state.remove);

  const { deleteBookmark } = useBookmarksApi();

  const deleteBookmarkWithUi = React.useCallback(
    (id: string) => {
      deleteBookmark(id, {
        onError: () => {
          errorToast({
            title: "Error deleting Bookmark...",
          });
        },
        onSuccess: () => {
          removeBookmark(id);
          successToast({
            description: randomAffirmation(),
            title: "Bookmark deleted!",
          });
        },
      });
    },
    [deleteBookmark, errorToast, removeBookmark, successToast]
  );

  return {
    deleteBookmarkWithUi,
  };
}
