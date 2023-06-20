import React from "react";

import { makeRequest, useRequestsStore } from "@/app/api";
import type {
  Bookmark,
  BookmarkPatchData,
  BookmarkPostData,
} from "@/app/bookmarks/bookmarks.types";
import { Callbacks } from "@/lib/api";
import { _ } from "@/lib/utils";

const API_ROOT = "api/bookmarks";

export const FETCH_BOOKMARKS_REQ_ID = "FetchBookmarks";
export const CREATE_BOOKMARK_REQ_ID = "CreateBookmark";

export function useBookmarksApi() {
  const addReq = useRequestsStore((state) => state.add);
  const updateReq = useRequestsStore((state) => state.update);
  const removeReq = useRequestsStore((state) => state.remove);

  //------------------------------------------------
  // FETCH
  //------------------------------------------------
  const fetchBookmarks = React.useCallback(
    ({ onError = _.noop, onSuccess = _.noop }: Callbacks<Bookmark[]> = {}) => {
      const req = makeRequest(FETCH_BOOKMARKS_REQ_ID);
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

        const { bookmarks } = data;
        updateReq(req.id, {
          state: "success",
          result: bookmarks,
        });
        onSuccess(bookmarks);
        return bookmarks;
      });
    },
    [addReq, updateReq]
  );

  //------------------------------------------------
  // CREATE
  //------------------------------------------------
  const createBookmark = React.useCallback(
    (
      values: BookmarkPostData,
      { onError = _.noop, onSuccess = _.noop }: Callbacks<Bookmark> = {}
    ) => {
      const req = makeRequest(CREATE_BOOKMARK_REQ_ID);
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
          result: data.bookmark,
        });
        onSuccess(data.bookmark);
        return data.bookmark;
      });
    },
    [addReq, updateReq]
  );

  //------------------------------------------------
  // UPDATE
  //------------------------------------------------
  const updateBookmark = React.useCallback(
    (
      id: string,
      values: Partial<BookmarkPatchData>,
      { onError = _.noop, onSuccess = _.noop }: Callbacks<Bookmark> = {}
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
          result: data.bookmark,
        });
        onSuccess(data.bookmark);
        return data.bookmark;
      });
    },
    [addReq, updateReq]
  );

  //------------------------------------------------
  // DELETE
  //------------------------------------------------
  const deleteBookmark = React.useCallback(
    (
      id: string,
      { onError = _.noop, onSuccess = _.noop }: Callbacks<Bookmark> = {}
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
        onSuccess(data.bookmark);
        return data.bookmark;
      });
    },
    [addReq, removeReq, updateReq]
  );

  return {
    createBookmark,
    deleteBookmark,
    fetchBookmarks,
    updateBookmark,
  };
}
