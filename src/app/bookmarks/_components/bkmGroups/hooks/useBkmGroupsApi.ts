import React from "react";

import { makeRequest, useRequestsStore } from "@/app/api";
import type {
  BkmGroup,
  BkmGroupPatchData,
  BkmGroupPostData,
} from "@/app/bookmarks/bookmarks.types";
import { PostgreSqlError } from "@/lib/api";
import { _ } from "@/lib/utils";

export const CREATE_BKM_GROUP_REQ_ID = "CreateBkmGroup";

const API_ROOT = "api/bkmGroups";

interface Callbacks<T> {
  onError?: (error: PostgreSqlError) => void;
  onSuccess?: (data: T) => void;
}

export function useBkmGroupsApi() {
  const addReq = useRequestsStore((state) => state.add);
  const updateReq = useRequestsStore((state) => state.update);
  const removeReq = useRequestsStore((state) => state.remove);

  //------------------------------------------------
  // CREATE
  //------------------------------------------------
  const createBkmGroup = React.useCallback(
    (
      values: BkmGroupPostData,
      { onError = _.noop, onSuccess = _.noop }: Callbacks<BkmGroup> = {}
    ) => {
      const req = makeRequest(CREATE_BKM_GROUP_REQ_ID);
      addReq(req);

      fetch(API_ROOT, {
        method: "POST",
        body: JSON.stringify(values),
      }).then(async (res) => {
        const data = await res.json();

        if (data.error) {
          updateReq(req.id, {
            error: data.error,
            state: "error",
          });
          onError(data.error);
          throw data.error;
        }

        updateReq(req.id, {
          state: "success",
          result: data.bkmGroup,
        });
        onSuccess(data.bkmGroup);
        return data.bkmGroup;
      });
    },
    [addReq, updateReq]
  );

  //------------------------------------------------
  // UPDATE
  //------------------------------------------------
  const updateBkmGroup = React.useCallback(
    (
      id: string,
      values: Partial<BkmGroupPatchData>,
      { onError = _.noop, onSuccess = _.noop }: Callbacks<BkmGroup> = {}
    ) => {
      const req = makeRequest(id);
      addReq(req);

      fetch(`${API_ROOT}/${id}`, {
        method: "PATCH",
        body: JSON.stringify(values),
      }).then(async (res) => {
        const data = await res.json();

        if (data.error) {
          updateReq(req.id, {
            error: data.error,
            state: "error",
          });
          onError(data.error);
          throw data.error;
        }

        updateReq(req.id, {
          state: "success",
          result: data.bkmGroup,
        });
        onSuccess(data.bkmGroup);
        return data.bkmGroup;
      });
    },
    [addReq, updateReq]
  );

  //------------------------------------------------
  // DELETE
  //------------------------------------------------
  const deleteBkmGroup = React.useCallback(
    (
      id: string,
      { onError = _.noop, onSuccess = _.noop }: Callbacks<BkmGroup> = {}
    ) => {
      const req = makeRequest(id);
      addReq(req);

      fetch(`${API_ROOT}/${id}`, {
        method: "DELETE",
      }).then(async (res) => {
        const data = await res.json();

        if (data.error) {
          updateReq(req.id, {
            error: data.error,
            state: "error",
          });
          onError(data.error);
          throw data.error;
        }

        removeReq(req.id);
        onSuccess(data.bkmGroup);
        return data.bkmGroup;
      });
    },
    [addReq, removeReq, updateReq]
  );

  return {
    createBkmGroup,
    deleteBkmGroup,
    updateBkmGroup,
  };
}
