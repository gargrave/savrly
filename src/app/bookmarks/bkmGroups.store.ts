import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type { BkmGroup } from "@/app/bookmarks/bookmarks.types";
import type { Store } from "@/lib/app.types";

interface BkmGroupsStore extends Store<BkmGroup> {}

// TODO: disable devtools in production (if we choose to keep it)
export const useBkmGroupsStore = create<BkmGroupsStore>()(
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
    }),
    { name: "BkmGroups" }
  )
);
