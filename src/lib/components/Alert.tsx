import {
  Alert as ChAlert,
  AlertIcon,
  AlertProps,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import React from "react";

type PickedProps = Pick<
  AlertProps,
  "children" | "className" | "status" | "title" | "variant"
>;

interface Props extends PickedProps {
  // TODO: add dismissable prop
}

export default function Alert({
  children,
  className,
  status = "info",
  title,
  variant = "left-accent",
}: Props) {
  return (
    <ChAlert className={className} status={status} variant={variant}>
      <AlertIcon />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </ChAlert>
  );
}
