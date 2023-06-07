import React from "react";

import type {
  BkmGroup,
  BkmGroupPatchData,
} from "@/app/bookmarks/bookmarks.types";
import { useBkmGroupsStore } from "@/app/bookmarks/_store";
import { useBkmGroupsApi } from "@/app/bookmarks/_components/bkmGroups/hooks";
import { type FormProps } from "@/lib/components";
import { useToasty } from "@/lib/hooks";
import { _ } from "@/lib/utils";

import EditBkmGroupForm from "./EditBkmGroupForm";

interface Props extends FormProps<BkmGroup> {
  groupId: string;
}

export default function EditBkmGroupFormContainer({
  groupId,
  onSuccess = _.noop,
}: Props) {
  const { errorToast, successToast } = useToasty();

  const bkmGroup = useBkmGroupsStore((state) => state.data[groupId]);
  const addBkmGroup = useBkmGroupsStore((state) => state.add);
  const { updateBkmGroup } = useBkmGroupsApi();

  const handleSubmit = React.useCallback(
    (data: Partial<BkmGroupPatchData>) => {
      updateBkmGroup(groupId, data, {
        onError: () => {
          errorToast({
            title: "Error updating Group",
          });
        },
        onSuccess: (result) => {
          successToast({
            title: "Group updated!",
          });
          addBkmGroup(result);
          onSuccess(result);
        },
      });
    },
    [addBkmGroup, errorToast, groupId, onSuccess, successToast, updateBkmGroup]
  );

  const handlers: React.ComponentProps<typeof EditBkmGroupForm>["handlers"] =
    React.useMemo(
      () => ({
        submit: handleSubmit,
      }),
      [handleSubmit]
    );

  return <EditBkmGroupForm bkmGroup={bkmGroup} handlers={handlers} />;
}
