import { Spinner as ChSpinner, SpinnerProps } from "@chakra-ui/react";
import { clsx } from "clsx";

type PickedProps = Pick<SpinnerProps, "size">;

interface Props extends PickedProps {
  asOverlay?: boolean;
}

export default function Spinner({ asOverlay, size = "md" }: Props) {
  return (
    <>
      {asOverlay && (
        <div className="absolute fill-parent bg-gray-700 bg-opacity-80" />
      )}
      <ChSpinner
        className={clsx(asOverlay && "absolute left-1/2")}
        size={size}
      />
    </>
  );
}
