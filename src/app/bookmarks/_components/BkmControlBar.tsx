import React from "react";

import styled from "@emotion/styled";

import { HEADER_HEIGHT } from "./BkmHeader";
import { BkmGroupPickerButton } from "./bkmGroups/BkmGroupPicker";

const St = {
  Container: styled.div`
    height: 44px;
    top: ${HEADER_HEIGHT}px;
  `,
};

export default function BkmControlBar() {
  return (
    <St.Container
      className={
        "px-3 sticky flex items-center justify-between shadow " +
        "border-b-2 border-zinc-700 dark:text-zinc-300 dark:bg-zinc-800 z-20"
      }
    >
      <BkmGroupPickerButton />
    </St.Container>
  );
}
