import React from "react";

import { useBookmarksApi } from "@/app/bookmarks/_components/hooks";
import { useBookmarksStore } from "@/app/bookmarks/_store";
import type {
  Bookmark,
  BookmarkPatchData,
} from "@/app/bookmarks/bookmarks.types";
import { type FormProps } from "@/lib/components";
import { useToasty } from "@/lib/hooks";
import { _ } from "@/lib/utils";

import EditBkmForm from "./EditBkmForm";

interface Props extends FormProps<Bookmark> {
  bkmId: string;
}

export default function EditBkmFormContainer({
  bkmId,
  onSuccess = _.noop,
}: Props) {
  const { errorToast, successToast } = useToasty();

  const bookmark = useBookmarksStore((state) => state.data[bkmId]);
  const addBkm = useBookmarksStore((state) => state.add);
  const { updateBookmark } = useBookmarksApi();

  // TODO: move to useBookmarksUiFns
  const handleSubmit = React.useCallback(
    (data: Partial<BookmarkPatchData>) => {
      updateBookmark(bkmId, data, {
        onError: () => {
          errorToast({
            title: "Error updating Bookmark...",
          });
        },
        onSuccess: (result) => {
          successToast({
            title: "Bookmark updated!",
          });
          addBkm(result);
          onSuccess(result);
        },
      });
    },
    [addBkm, bkmId, errorToast, onSuccess, successToast, updateBookmark]
  );

  const handlers: React.ComponentProps<typeof EditBkmForm>["handlers"] =
    React.useMemo(
      () => ({
        submit: handleSubmit,
      }),
      [handleSubmit]
    );

  return <EditBkmForm bookmark={bookmark} handlers={handlers} />;
}
