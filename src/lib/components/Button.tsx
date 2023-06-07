import { Button as ChButton, ButtonProps } from "@chakra-ui/react";
import React from "react";

import { _ } from "@/lib/utils";

interface Props extends ButtonProps {
  confirmText?: string;
  confirmTimeout?: number;
  onConfirmTimeout?: () => void;
}

export default function Button(props: Props) {
  const {
    confirmText,
    confirmTimeout = 2500,
    onClick = _.noop,
    onConfirmTimeout = _.noop,
    ...otherProps
  } = props;

  const [isConfirming, setConfirming] = React.useState(false);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> =
    React.useCallback(
      (event) => {
        event.stopPropagation();
        if (isConfirming) {
          onClick(event);
          setConfirming(false);
        } else {
          setConfirming(true);
          setTimeout(() => {
            setConfirming(false);
            onConfirmTimeout();
          }, confirmTimeout);
        }
      },
      [confirmTimeout, isConfirming, onClick, onConfirmTimeout]
    );

  return (
    <ChButton {...otherProps} onClick={confirmText ? handleClick : onClick}>
      {isConfirming ? confirmText : props.children}
    </ChButton>
  );
}
