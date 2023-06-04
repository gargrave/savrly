import React from "react";

import { Icon as ChIcon, IconProps } from "@chakra-ui/react";
import type { IconType } from "react-icons";
import { IoAddCircleOutline, IoFolderOpenOutline } from "react-icons/io5";

type IconName = "folder" | "plusCircle";

const components: Record<IconName, IconType> = {
  folder: IoFolderOpenOutline,
  plusCircle: IoAddCircleOutline,
};

interface Props {
  className?: string;
  color?: string;
  icon: IconName;
  paddingTop?: number;
  size?: number;
}

export default function Icon({
  className = "",
  color = "white",
  icon,
  paddingTop = 0,
  size = 20,
}: Props) {
  const _Icon = components[icon];
  return (
    <ChIcon
      as={_Icon}
      boxSize={`${size}px`}
      className={className}
      color={color}
      paddingTop={`${paddingTop}px`}
    />
  );
}
