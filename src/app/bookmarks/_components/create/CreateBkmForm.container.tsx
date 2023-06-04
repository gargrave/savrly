import { useToast } from "@chakra-ui/react";
import React from "react";
import { useAsync } from "@react-hookz/web";

import { useBookmarksStore } from "@/app/bookmarks/bookmarks.store";
import type { Bookmark } from "@/app/bookmarks/bookmarks.types";
import { type FormProps } from "@/lib/components";
import { _ } from "@/lib/utils";

import CreateBkmForm, { CreateBkmFields } from "./CreateBkmForm";

interface Props extends FormProps<Bookmark> {}

export default function CreateBkmFormContainer({ onSuccess = _.noop }: Props) {
  const addBkm = useBookmarksStore((state) => state.add);
  const toast = useToast();

  const [createBkmState, createBkmFns] = useAsync(async (values) =>
    // TODO: can we move this to a server action?
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#server-action
    fetch("api/bookmarks", {
      method: "POST",
      body: JSON.stringify(values),
    }).then(async (res) => {
      const data = await res.json();

      if (data.error) {
        throw data.error;
      }

      return data.bookmark;
    })
  );

  const handleSubmit = React.useCallback(
    (data: CreateBkmFields) => {
      createBkmFns.reset();
      createBkmFns.execute(data);
    },
    [createBkmFns]
  );

  React.useEffect(() => {
    const { result, status } = createBkmState;

    if (status === "success" && result) {
      toast({
        isClosable: true,
        status: "success",
        title: "Bookmark created!",
      });
      addBkm(result);
      onSuccess(result);
    }
  }, [addBkm, createBkmState, onSuccess, toast]);

  const handlers: React.ComponentProps<typeof CreateBkmForm>["handlers"] =
    React.useMemo(
      () => ({
        submit: handleSubmit,
      }),
      [handleSubmit]
    );

  return <CreateBkmForm handlers={handlers} requestState={createBkmState} />;
}
