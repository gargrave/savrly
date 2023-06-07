import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type { Bookmark } from "@/app/bookmarks/bookmarks.types";
import type { Store } from "@/lib/app.types";

interface BookmarksStore extends Store<Bookmark> {
  purgeBkmGroup: (id: string) => void;
}

// TODO: disable devtools in production (if we choose to keep it)
export const useBookmarksStore = create<BookmarksStore>()(
  devtools(
    (set) => ({
      data: {},

      setData: (data) =>
        set(
          (state) =>
            produce(state, (draft) => {
              data.forEach((item) => (draft.data[item.id] = item));
            }),
          false,
          "Set Bookmarks"
        ),

      add: (data) =>
        set(
          (state) =>
            produce(state, (draft) => {
              draft.data[data.id] = data;
            }),
          false,
          "Add Bookmark"
        ),

      remove: (id) =>
        set(
          (state) =>
            produce(state, (draft) => {
              delete draft.data[id];
            }),
          false,
          "Remove Bookmark"
        ),

      purgeBkmGroup: (id) =>
        set(
          (state) =>
            produce(state, (draft) => {
              Object.keys(state.data).forEach((bkmId) => {
                if (state.data[bkmId].groupId === id) {
                  draft.data[bkmId].groupId = null;
                }
              });
            }),
          false,
          "Purge BkmGroup"
        ),
    }),
    { name: "Bookmarks" }
  )
);
