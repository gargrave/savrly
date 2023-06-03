import { Spinner as ChSpinner, SpinnerProps } from "@chakra-ui/react";

type PickedProps = Pick<SpinnerProps, "size">;

interface Props extends PickedProps {
  asOverlay?: boolean;
}

export default function Spinner({ asOverlay, size = "md" }: Props) {
  return (
    <>
      <ChSpinner size={size} />
      {asOverlay && (
        <div className="absolute fill-screen bg-gray-700 bg-opacity-80" />
      )}
    </>
  );
}
