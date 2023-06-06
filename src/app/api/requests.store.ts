import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { RequestState } from "@/lib/api";
import { Store } from "@/lib/app.types";

//------------------------------------------------
// Utils
//------------------------------------------------

export function makeRequest(
  id: string,
  overrides: Partial<RequestState<unknown>> = {}
) {
  const request: RequestState<unknown> = {
    id,
    error: null,
    state: "loading",
    result: null,
    ...overrides,
  };

  return request;
}

//------------------------------------------------
// Requests Store
//------------------------------------------------

interface RequestsStore extends Omit<Store<RequestState<unknown>>, "setData"> {
  update: (id: string, updates: Partial<RequestState<unknown>>) => void;
}

// TODO: disable devtools in production (if we choose to keep it)
export const useRequestsStore = create<RequestsStore>()(
  devtools(
    (set) => ({
      data: {},

      add: (request) =>
        set(
          (state) =>
            produce(state, (draft) => {
              draft.data[request.id] = request;
            }),
          false,
          "Add Request"
        ),

      update: (id, updates) =>
        set(
          (state) =>
            produce(state, (draft) => {
              const req = draft.data[id];
              if (req) {
                draft.data[id] = {
                  ...req,
                  ...updates,
                };
              }
            }),
          false,
          "Update Request"
        ),

      remove: (id) =>
        set(
          (state) =>
            produce(state, (draft) => {
              delete draft.data[id];
            }),
          false,
          "Remove Request"
        ),
    }),
    { name: "Requests" }
  )
);
