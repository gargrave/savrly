import React from "react";

import { useRequestsStore } from "@/app/api";
import { CREATE_BKM_GROUP_REQ_ID } from "@/app/bookmarks/_components/bkmGroups/hooks";
import type { BkmGroupPostData } from "@/app/bookmarks/bookmarks.types";
import {
  Alert,
  Button,
  InputField,
  useFormFns,
  type FormConfig,
} from "@/lib/components";
import { prevent } from "@/lib/utils";

const initialFormValues = Object.freeze<BkmGroupPostData>({
  name: "",
});

const validate: FormConfig<BkmGroupPostData>["validate"] = (
  values: BkmGroupPostData
) => Object.values(values).every(Boolean);

interface Props {
  handlers: {
    submit: (values: BkmGroupPostData) => void;
  };
}

export default function CreateBkmGroupForm({ handlers }: Props) {
  const request = useRequestsStore(
    (state) => state.data[CREATE_BKM_GROUP_REQ_ID]
  );
  const isLoading = request?.state === "loading";
  const error = request?.error;

  const { formValues, handleChange, resetFormValues, valid } =
    useFormFns<BkmGroupPostData>(initialFormValues, { validate });

  // autofocus first input on mount
  // TODO: try to use Chakra drawer prop for this
  React.useEffect(() => {
    setTimeout(() => {
      const urlInput = document.querySelector(
        'input[name="name"]'
      ) as HTMLInputElement;

      if (urlInput) {
        urlInput.focus();
      }
    }, 0);
  }, []);

  React.useEffect(() => {
    if (request?.state === "success") {
      resetFormValues();
    }
  }, [request?.state, resetFormValues]);

  return (
    <form onSubmit={prevent(() => handlers.submit(formValues))}>
      <InputField
        isRequired
        isDisabled={isLoading}
        label={"Name"}
        onChange={handleChange}
        name={"name"}
        placeholder={"Name"}
        value={formValues.name}
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
