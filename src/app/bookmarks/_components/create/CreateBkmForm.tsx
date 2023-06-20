import React from "react";

import {
  Alert,
  Button,
  InputField,
  useFormFns,
  type FormConfig,
} from "@/lib/components";
import { stopPrevent } from "@/lib/utils";
import { useRequestsStore } from "@/app/api";
import { CREATE_BOOKMARK_REQ_ID } from "@/app/bookmarks/_components/hooks";

export type CreateBkmFields = {
  url: string;
};

const initialFormValues = Object.freeze<CreateBkmFields>({
  url: "",
});

const validate: FormConfig<CreateBkmFields>["validate"] = (
  values: CreateBkmFields
) => Object.values(values).every(Boolean);

interface Props {
  handlers: {
    submit: (values: CreateBkmFields) => void;
  };
}

export default function CreateBkmForm({ handlers }: Props) {
  const request = useRequestsStore(
    (state) => state.data[CREATE_BOOKMARK_REQ_ID]
  );
  const isLoading = request?.state === "loading";
  const error = request?.error;

  const { formValues, handleChange, valid } = useFormFns<CreateBkmFields>(
    initialFormValues,
    { validate }
  );

  // autofocus first input on mount
  React.useEffect(() => {
    setTimeout(() => {
      const urlInput = document.querySelector(
        'input[name="url"]'
      ) as HTMLInputElement;

      urlInput?.focus();
    }, 0);
  }, []);

  return (
    <form onSubmit={stopPrevent(() => handlers.submit(formValues))}>
      <InputField
        isRequired
        isDisabled={isLoading}
        label={"URL"}
        onChange={handleChange}
        name={"url"}
        placeholder={"URL"}
        value={formValues.url}
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
