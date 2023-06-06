import { Button as ChButton, ButtonProps } from "@chakra-ui/react";

interface Props extends ButtonProps {}

export default function Button(props: Props) {
  return <ChButton {...props}>{props.children}</ChButton>;
}
