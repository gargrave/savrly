import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type { BkmGroup } from "@/app/bookmarks/bookmarks.types";
import type { Store } from "@/lib/app.types";

export interface BkmGroupsStore extends Store<BkmGroup> {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}

// TODO: disable devtools in production (if we choose to keep it)
export const useBkmGroupsStore = create<BkmGroupsStore>()(
  devtools(
    (set) => ({
      data: {},
      selectedId: null,

      setData: (data) =>
        set(
          (state) =>
            produce(state, (draft) => {
              data.forEach((item) => (draft.data[item.id] = item));
            }),
          false,
          "Set BkmGroups"
        ),

      add: (data) =>
        set(
          (state) =>
            produce(state, (draft) => {
              draft.data[data.id] = data;
            }),
          false,
          "Add BkmGroup"
        ),

      remove: (id) =>
        set(
          (state) =>
            produce(state, (draft) => {
              delete draft.data[id];
            }),
          false,
          "Remove BkmGroup"
        ),

      setSelectedId: (id) =>
        set(
          (state) =>
            produce(state, (draft) => {
              draft.selectedId = id;
            }),
          false,
          "Set Selected ID"
        ),
    }),
    { name: "BkmGroups" }
  )
);
