import React from "react";

import styled from "@emotion/styled";

import { HEADER_HEIGHT } from "./BkmHeader";
import { BkmGroupPickerButton } from "./BkmGroupPicker";

const St = {
  Container: styled.div`
    height: 44px;
    top: ${HEADER_HEIGHT}px;
  `,
};

export default function BkmControlBar() {
  return (
    <St.Container
      className={`px-3 sticky flex items-center justify-between 
        border-b-2 border-gray-600 dark:text-gray-300 dark:bg-zinc-800 z-10`}
    >
      <BkmGroupPickerButton />
    </St.Container>
  );
}
