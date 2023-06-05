import React from "react";

import { useToast } from "@chakra-ui/react";
import { useAsync } from "@react-hookz/web";

import { useBookmarksStore } from "@/app/bookmarks/_store";
import type { BkmPatchData, Bookmark } from "@/app/bookmarks/bookmarks.types";
import { type FormProps } from "@/lib/components";
import { _, findUpdatedKeys } from "@/lib/utils";

import EditBkmForm from "./EditBkmForm";

interface Props extends FormProps<Bookmark> {
  bkmId: string;
}

export default function EditBkmFormContainer({
  bkmId,
  onSuccess = _.noop,
}: Props) {
  const bookmark = useBookmarksStore((state) => state.data[bkmId]);
  const addBkm = useBookmarksStore((state) => state.add);
  const toast = useToast();

  const [updateBkmState, updateBkmFns] = useAsync(
    async (patchData: Partial<BkmPatchData>) =>
      fetch(`api/bookmarks/${bkmId}`, {
        method: "PATCH",
        body: JSON.stringify(patchData),
      }).then(async (res) => {
        const data = await res.json();

        if (data.error) {
          throw data.error;
        }

        return data.bookmark;
      })
  );

  const handleSubmit = React.useCallback(
    (patchData: BkmPatchData) => {
      const keys = findUpdatedKeys(patchData, bookmark);
      if (keys.length) {
        const updates = _.pick(keys, patchData);
        updateBkmFns.reset();
        updateBkmFns.execute(updates);
      }
    },
    [bookmark]
  );

  React.useEffect(() => {
    const { result, status } = updateBkmState;

    if (status === "success" && result) {
      toast({
        isClosable: true,
        status: "success",
        title: "Bookmark updated!",
      });
      addBkm(result);
      onSuccess(result);
    }
  }, [addBkm, updateBkmState, onSuccess, toast]);

  const handlers: React.ComponentProps<typeof EditBkmForm>["handlers"] =
    React.useMemo(
      () => ({
        submit: handleSubmit,
      }),
      [handleSubmit]
    );

  return (
    <EditBkmForm
      bookmark={bookmark}
      handlers={handlers}
      requestState={updateBkmState}
    />
  );
}
