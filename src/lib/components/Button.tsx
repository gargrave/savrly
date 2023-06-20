import { Button as ChButton, ButtonProps } from "@chakra-ui/react";
import React from "react";

import { _ } from "@/lib/utils";
import { clsx } from "clsx";

interface Props extends ButtonProps {
  block?: boolean;
  classes?: string;
  confirmText?: string;
  confirmTimeout?: number;
  onConfirmTimeout?: () => void;
}

export default function Button(props: Props) {
  const {
    block,
    classes,
    confirmText,
    confirmTimeout = 2500,
    onClick = _.noop,
    onConfirmTimeout = _.noop,
    ...otherProps
  } = props;

  const [isConfirming, setConfirming] = React.useState(false);

  let timeoutRef = React.useRef<any>();
  const handleClick: React.MouseEventHandler<HTMLButtonElement> =
    React.useCallback(
      (event) => {
        event.stopPropagation();
        if (isConfirming) {
          clearTimeout(timeoutRef.current);
          onClick(event);
          setConfirming(false);
        } else {
          setConfirming(true);
          timeoutRef.current = setTimeout(() => {
            setConfirming(false);
            onConfirmTimeout();
          }, confirmTimeout);
        }
      },
      [confirmTimeout, isConfirming, onClick, onConfirmTimeout]
    );

  return (
    <ChButton
      className={clsx(classes, block && "w-full")}
      {...otherProps}
      onClick={confirmText ? handleClick : onClick}
    >
      {isConfirming ? confirmText : props.children}
    </ChButton>
  );
}
