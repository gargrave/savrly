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
        <div className="absolute fill-parent dark:bg-zinc-900 dark:bg-opacity-60" />
      )}

      <div
        className={clsx(
          asOverlay &&
            "absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]"
        )}
      >
        <ChSpinner size={size} />
      </div>
    </>
  );
}
