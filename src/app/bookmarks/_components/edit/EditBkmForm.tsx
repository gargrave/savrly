import React from "react";

import type {
  BookmarkPatchData,
  Bookmark,
} from "@/app/bookmarks/bookmarks.types";
import EditBkmGroupPicker from "@/app/bookmarks/_components/edit/EditBkmGroupPicker";
import {
  Alert,
  Button,
  InputField,
  useFormFns,
  type FormConfig,
} from "@/lib/components";
import { _, findUpdatedKeys, prevent } from "@/lib/utils";
import { useRequestsStore } from "@/app/api";

// TODO: find a sane way to sanitize/trim strings
const validate =
  (original: Bookmark): FormConfig<BookmarkPatchData>["validate"] =>
  (values: BookmarkPatchData): boolean => {
    // validate that at least one field has changed
    const keys = findUpdatedKeys(values, original);
    if (!keys.length) return false;

    const requiredFields = _.pick(["title", "url"], values);
    return Object.values(requiredFields).every(Boolean);
  };

interface Props {
  bookmark: Bookmark;
  handlers: {
    submit: (values: BookmarkPatchData) => void;
  };
}

export default function EditBkmForm({ bookmark, handlers }: Props) {
  const request = useRequestsStore((state) => state.data[bookmark?.id || ""]);
  const isLoading = request?.state === "loading";
  const error = request?.error;

  const { formValues, handleChange, setValueByKey, valid } =
    useFormFns<BookmarkPatchData>(bookmark, { validate: validate(bookmark) });

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
