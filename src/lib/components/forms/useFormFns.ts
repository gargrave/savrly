import React from "react";
import type { CurriedFunction2 } from "lodash";

import { _ } from "@/lib/utils";

type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

type UseFormFns<FormValuesType> = {
  formValues: FormValuesType;
  handleChange: (event: InputChangeEvent) => void;
  resetFormValues: () => void;
  setValueByKey: CurriedFunction2<string, unknown, void>;
  valid: boolean;
};

export interface FormConfig<FormValuesType> {
  validate?: (values: FormValuesType) => boolean;
}

export function useFormFns<FormValuesType extends Object>(
  initialValues: FormValuesType,
  config: FormConfig<FormValuesType> = {}
): UseFormFns<FormValuesType> {
  const { validate = _.always(true) } = config;
  const [valid, setValid] = React.useState(false);

  const [formValues, setFormValues] =
    React.useState<FormValuesType>(initialValues);

  const setValueByKey = React.useCallback(
    (key: string, value: unknown) => {
      if (key in initialValues) {
        setFormValues((prev) => ({
          ...prev,
          [key]: value,
        }));
      }
    },
    [initialValues]
  );

  const resetFormValues = React.useCallback(() => {
    setFormValues(initialValues);
  }, [initialValues]);

  const handleChange = React.useCallback(
    (event: InputChangeEvent) => {
      const { name = "", value = "" } = event.target;
      setValueByKey(name, value);
    },
    [setValueByKey]
  );

  React.useEffect(() => {
    setValid(validate(formValues));
  }, [formValues, validate]);

  React.useEffect(() => {
    setFormValues(initialValues);
  }, [initialValues]);

  return {
    formValues,
    handleChange,
    resetFormValues,
    setValueByKey: _.curry(setValueByKey),
    valid,
  };
}
