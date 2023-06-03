import React from "react";
import { AsyncState } from "@react-hookz/web";
import { Button } from "@chakra-ui/react";

import type { Bookmark } from "@/app/bookmarks/bookmarks.types";
import {
  Alert,
  // Button,
  InputField,
  useFormFns,
  type FormConfig,
} from "@/lib/components";
import { prevent } from "@/lib/utils";

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
  requestState: AsyncState<Bookmark>;
}

export default function CreateBkmForm({ handlers, requestState }: Props) {
  const isLoading = requestState.status === "loading";
  const error = requestState.error;

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

      if (urlInput) {
        urlInput.focus();
      }
    }, 0);
  }, []);

  return (
    <form onSubmit={prevent(() => handlers.submit(formValues))}>
      {/* TODO: auto-focus input*/}
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
        {/* TODO: make a wrapper Button components */}
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
