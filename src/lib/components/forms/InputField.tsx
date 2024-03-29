import React from "react";
import {
  FormControl,
  FormLabel,
  InputProps as ChakraInputProps,
  Input as ChakraInput,
  // FormErrorMessage,
  // FormHelperText,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

const St = {
  FormControl: styled(FormControl)`
    &:not(:first-of-type) {
      margin-top: 16px;
    }
  `,
};

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

export default function InputField({
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
    <St.FormControl
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
    </St.FormControl>
  );
}
