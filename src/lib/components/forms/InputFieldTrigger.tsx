import React from "react";
import {
  FormControl,
  FormLabel,
  InputProps as ChakraInputProps,
  Input as ChakraInput,
} from "@chakra-ui/react";
import { clsx } from "clsx";
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
  displayValue?: string;
  label: string;
  onClick?: () => void;
}

export default function InputFieldTrigger({
  displayValue,
  isDisabled,
  isReadOnly,
  isRequired,
  label,
  name,
  onChange,
  onClick,
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
      onClick={onClick}
    >
      <FormLabel className={clsx("cursor-pointer")}>{label}</FormLabel>

      {/* dummy input field for display */}
      <ChakraInput
        className={clsx("cursor-pointer")}
        id={`${name}__display`}
        name={`${name}__display`}
        onChange={onChange}
        placeholder={placeholder}
        size={size}
        type={"text"}
        value={displayValue || value}
        isReadOnly
      />

      {/* hidden input field with actual value */}
      <ChakraInput
        name={name}
        onChange={onChange}
        size={size}
        type={"hidden"}
        value={value}
      />
    </St.FormControl>
  );
}
