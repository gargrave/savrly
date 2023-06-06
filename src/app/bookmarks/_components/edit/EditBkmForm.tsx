import React from "react";

import { AsyncState } from "@react-hookz/web";

import type { BkmPatchData, Bookmark } from "@/app/bookmarks/bookmarks.types";
import EditBkmGroupPicker from "@/app/bookmarks/_components/edit/EditBkmGroupPicker";
import {
  Alert,
  Button,
  InputField,
  useFormFns,
  type FormConfig,
} from "@/lib/components";
import { _, findUpdatedKeys, prevent } from "@/lib/utils";

// TODO: find a sane way to sanitize/trim strings
const validate =
  (original: Bookmark): FormConfig<BkmPatchData>["validate"] =>
  (values: BkmPatchData): boolean => {
    // validate that at least one field has changed
    const keys = findUpdatedKeys(values, original);
    if (!keys.length) return false;

    const requiredFields = _.pick(["title", "url"], values);
    return Object.values(requiredFields).every(Boolean);
  };

interface Props {
  bookmark: Bookmark;
  handlers: {
    submit: (values: BkmPatchData) => void;
  };
  requestState: AsyncState<Bookmark>;
}

export default function EditBkmForm({
  bookmark,
  handlers,
  requestState,
}: Props) {
  const isLoading = requestState.status === "loading";
  const error = requestState.error;

  const { formValues, handleChange, setValueByKey, valid } =
    useFormFns<BkmPatchData>(bookmark, { validate: validate(bookmark) });

  // autofocus first input on mount
  // TODO: see if we can do this with drawer prop instead: https://chakra-ui.com/docs/components/drawer/usage#focus-on-specific-element
  React.useEffect(() => {
    setTimeout(() => {
      const urlInput = document.querySelector(
        'input[name="title"]'
      ) as HTMLInputElement;

      if (urlInput) {
        urlInput.focus();
      }
    }, 0);
  }, []);

  return (
    <form onSubmit={prevent(() => handlers.submit(formValues))}>
      {/* URL Input */}
      <InputField
        isRequired
        isDisabled={isLoading}
        label={"URL"}
        onChange={handleChange}
        name={"url"}
        placeholder={"URL"}
        value={formValues.url}
      />

      {/* Title Input */}
      <InputField
        isRequired
        isDisabled={isLoading}
        label={"Title"}
        onChange={handleChange}
        name={"title"}
        placeholder={"Title"}
        value={formValues.title}
      />

      {/* Group Picker */}
      {/* TODO: this trigger would probably be better off as a button */}
      <EditBkmGroupPicker
        groupId={formValues.groupId}
        isLoading={isLoading}
        onChange={setValueByKey("groupId")}
      />

      {error && (
        <Alert className={"mt-4"} status={"error"}>
          Error saving Bookmark
        </Alert>
      )}

      <div className={"flex items-center justify-end mb-2 mt-4"}>
        <Button
          colorScheme={"blue"}
          isDisabled={!valid || isLoading}
          isLoading={isLoading}
          type={"submit"}
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
