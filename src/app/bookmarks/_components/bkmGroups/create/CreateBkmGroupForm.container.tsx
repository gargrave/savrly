import { Heading } from "@chakra-ui/react";
import React from "react";

import type {
  BkmGroup,
  BkmGroupPostData,
} from "@/app/bookmarks/bookmarks.types";
import { useBkmGroupsStore } from "@/app/bookmarks/_store";
import { useBkmGroupsApi } from "@/app/bookmarks/_components/bkmGroups/hooks";
import { type FormProps } from "@/lib/components";
import { _ } from "@/lib/utils";
import { useToasty } from "@/lib/hooks";

import CreateBkmGroupForm from "./CreateBkmGroupForm";

interface Props extends FormProps<BkmGroup> {}

export default function CreateBkmGroupFormContainer({
  onSuccess = _.noop,
}: Props) {
  const { errorToast, successToast } = useToasty();

  const addBkmGroup = useBkmGroupsStore((state) => state.add);
  const { createBkmGroup } = useBkmGroupsApi();

  const handleSubmit = React.useCallback(
    (data: BkmGroupPostData) => {
      createBkmGroup(data, {
        onError: () => {
          errorToast({
            title: "Error creating Group...",
          });
        },
        onSuccess: (result) => {
          successToast({
            title: "Group created!",
          });
          addBkmGroup(result);
          onSuccess(result);
        },
      });
    },
    [addBkmGroup, createBkmGroup, errorToast, onSuccess, successToast]
  );

  const handlers: React.ComponentProps<typeof CreateBkmGroupForm>["handlers"] =
    React.useMemo(
      () => ({
        submit: handleSubmit,
      }),
      [handleSubmit]
    );

  return (
    <>
      <Heading as={"h4"} size={"md"} className={"mb-2"}>
        New Group
      </Heading>
      <CreateBkmGroupForm handlers={handlers} />
    </>
  );
}
