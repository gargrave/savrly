import React from "react";
import { Icon as ChakraIcon } from "@chakra-ui/react";
import type { IconType } from "react-icons";
import { IoFolderOpenOutline, IoAddCircleOutline } from "react-icons/io5";

type IconName = "folder" | "plusCircle";

const components: Record<IconName, IconType> = {
  folder: IoFolderOpenOutline,
  plusCircle: IoAddCircleOutline,
};

interface Props {
  className?: string;
  color?: string;
  icon: IconName;
  size?: number;
}

export default function Icon({
  className = "",
  color = "white",
  icon,
  size = 20,
}: Props) {
  const _Icon = components[icon];
  return (
    <ChakraIcon
      as={_Icon}
      className={className}
      color={color}
      h={size}
      w={size}
    />
  );
}
