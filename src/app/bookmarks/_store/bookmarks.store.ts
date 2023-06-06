import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type { Bookmark } from "@/app/bookmarks/bookmarks.types";
import type { Store } from "@/lib/app.types";

interface BookmarksStore extends Store<Bookmark> {}

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
    }),
    { name: "Bookmarks" }
  )
);
