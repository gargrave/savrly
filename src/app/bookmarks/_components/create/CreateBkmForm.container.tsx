import React from "react";

import { useBookmarksApi } from "@/app/bookmarks/_components/hooks";
import { useBookmarksStore } from "@/app/bookmarks/_store";
import {
  type Bookmark,
  BookmarkPostData,
} from "@/app/bookmarks/bookmarks.types";
import { type FormProps } from "@/lib/components";
import { useToasty } from "@/lib/hooks";
import { _ } from "@/lib/utils";

import CreateBkmForm from "./CreateBkmForm";

interface Props extends FormProps<Bookmark> {}

export default function CreateBkmFormContainer({ onSuccess = _.noop }: Props) {
  const { errorToast, successToast } = useToasty();

  const addBkm = useBookmarksStore((state) => state.add);
  const { createBookmark } = useBookmarksApi();

  // TODO: move to useBookmarksUiFns
  const handleSubmit = React.useCallback(
    (data: BookmarkPostData) => {
      createBookmark(data, {
        onError: () => {
          errorToast({
            title: "Error creating Bookmark...",
          });
        },
        onSuccess: (result) => {
          successToast({
            title: "Bookmark created!",
          });
          addBkm(result);
          onSuccess(result);
        },
      });
    },
    [addBkm, createBookmark, errorToast, onSuccess, successToast]
  );

  const handlers: React.ComponentProps<typeof CreateBkmForm>["handlers"] =
    React.useMemo(
      () => ({
        submit: handleSubmit,
      }),
      [handleSubmit]
    );

  return <CreateBkmForm handlers={handlers} />;
}
