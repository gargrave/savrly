import React from "react";

import { makeRequest, useRequestsStore } from "@/app/api";
import type {
  BkmGroup,
  BkmGroupPatchData,
  BkmGroupPostData,
} from "@/app/bookmarks/bookmarks.types";
import { Callbacks } from "@/lib/api";
import { _ } from "@/lib/utils";

const API_ROOT = "api/bkmGroups";

export const FETCH_GROUPS_REQ_ID = "FetchGroups";
export const CREATE_BKM_GROUP_REQ_ID = "CreateBkmGroup";

export function useBkmGroupsApi() {
  const addReq = useRequestsStore((state) => state.add);
  const updateReq = useRequestsStore((state) => state.update);
  const removeReq = useRequestsStore((state) => state.remove);
  //------------------------------------------------
  // FETCH
  //------------------------------------------------
  const fetchGroups = React.useCallback(
    ({ onError = _.noop, onSuccess = _.noop }: Callbacks<BkmGroup[]> = {}) => {
      const req = makeRequest(FETCH_GROUPS_REQ_ID);
      addReq(req);

      fetch(API_ROOT, {
        method: "GET",
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

        const { bkmGroups } = data;
        updateReq(req.id, {
          state: "success",
          result: bkmGroups,
        });
        onSuccess(bkmGroups);
        return bkmGroups;
      });
    },
    [addReq, updateReq]
  );

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
    fetchGroups,
    updateBkmGroup,
  };
}
