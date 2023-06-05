import React from "react";

import { Icon as ChIcon } from "@chakra-ui/react";
import type { IconType } from "react-icons";
import {
  IoAddCircleOutline,
  IoCreateOutline,
  IoEllipsisHorizontalCircleOutline,
  IoFolderOpenOutline,
} from "react-icons/io5";

type IconName = "edit" | "folder" | "menu" | "plusCircle";

const components: Record<IconName, IconType> = {
  edit: IoCreateOutline,
  folder: IoFolderOpenOutline,
  menu: IoEllipsisHorizontalCircleOutline,
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
  color = "currentColor",
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
