import React from "react";

import { useRequestsStore } from "@/app/api";
import type {
  BkmGroup,
  BkmGroupPatchData,
} from "@/app/bookmarks/bookmarks.types";
import EditBkmGroupPicker from "@/app/bookmarks/_components/edit/EditBkmGroupPicker";
import {
  Alert,
  Button,
  InputField,
  useFormFns,
  type FormConfig,
} from "@/lib/components";
import { _, findUpdatedKeys, stopPrevent } from "@/lib/utils";

// TODO: find a sane way to sanitize/trim strings
const validate =
  (original: BkmGroup): FormConfig<BkmGroupPatchData>["validate"] =>
  (values: BkmGroupPatchData) => {
    // validate that at least one field has changed
    const keys = findUpdatedKeys(values, original);
    if (!keys.length) return false;

    const requiredFields = _.pick(["name"], values);
    return Object.values(requiredFields).every(Boolean);
  };

interface Props {
  bkmGroup: BkmGroup;
  handlers: {
    submit: (values: BkmGroupPatchData) => void;
  };
}

export default function EditBkmGroupForm({ bkmGroup, handlers }: Props) {
  const request = useRequestsStore((state) => state.data[bkmGroup?.id || ""]);
  const isLoading = request?.state === "loading";
  const error = request?.error;

  const { formValues, handleChange, setValueByKey, valid } =
    useFormFns<BkmGroupPatchData>(bkmGroup, { validate: validate(bkmGroup) });

  return (
    <form onSubmit={stopPrevent(() => handlers.submit(formValues))}>
      {/* Name Input */}
      <InputField
        isRequired
        isDisabled={isLoading}
        label={"Name"}
        onChange={handleChange}
        name={"name"}
        placeholder={"Name"}
        value={formValues.name}
      />

      {/* Group Picker */}
      {/* TODO: this trigger would probably be better off as a button */}
      <EditBkmGroupPicker
        groupId={formValues.parent}
        isLoading={isLoading}
        label="Parent Group"
        onChange={setValueByKey("parent")}
        placeholder="No Parent Group"
      />

      {error && (
        <Alert className={"mt-4"} status={"error"}>
          Error saving Group
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
