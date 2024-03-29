import React from "react";

import type { Bookmark } from "@/app/bookmarks/bookmarks.types";
import { _ } from "@/lib/utils";

import { useBkmGroupsStore } from "./bkmGroups.store";
import { useBookmarksStore } from "./bookmarks.store";

export const useCountAllBkms = () => {
  const bookmarks = useBookmarksStore(_.prop("data"));

  return React.useMemo(() => {
    return Object.keys(bookmarks || {}).length;
  }, [bookmarks]);
};

export const useCountBkmByGroup = (groupId: string) => {
  const bookmarks = useBookmarksStore(_.prop("data"));

  return React.useMemo(() => {
    const isSameGroup = (bkm: Bookmark) => bkm.groupId === groupId;
    return _.countBy(isSameGroup, bookmarks)["true"] || 0;
  }, [bookmarks, groupId]);
};

export const useCountBkmBySelectedGroup = () => {
  const bookmarks = useBookmarksStore(_.prop("data"));
  const groupId = useBkmGroupsStore(_.prop("selectedId"));

  return React.useMemo(() => {
    const isSameGroup = (bkm: Bookmark) => bkm.groupId === groupId;
    return _.countBy(isSameGroup, bookmarks)["true"] || 0;
  }, [bookmarks, groupId]);
};
