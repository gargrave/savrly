import React from "react";
import {
  FormControl,
  FormLabel,
  InputProps as ChakraInputProps,
  Input as ChakraInput,
  // FormErrorMessage,
  // FormHelperText,
} from "@chakra-ui/react";

type PickedProps = Pick<
  ChakraInputProps,
  | "isDisabled"
  | "isReadOnly"
  | "isRequired"
  | "name"
  | "onChange"
  | "placeholder"
  | "size"
  | "value"
>;

interface Props extends PickedProps {
  inputType?: "text" | "email";
  label: string;
}

export default function Input({
  inputType = "text",
  isDisabled,
  isReadOnly,
  isRequired,
  label,
  name,
  onChange,
  placeholder,
  size,
  value,
}: Props) {
  return (
    <FormControl
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      label={label}
    >
      <FormLabel>{label}</FormLabel>
      <ChakraInput
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        size={size}
        type={inputType}
        value={value}
      />
    </FormControl>
  );
}
