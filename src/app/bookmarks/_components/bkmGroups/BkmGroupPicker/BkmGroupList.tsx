import React from "react";

import styled from "@emotion/styled";

import type { BkmGroup } from "@/app/bookmarks/bookmarks.types";
import BkmGroupRow from "./BkmGroupRow";

const St = {
  Container: styled.div`
    max-height: 40vh;
  `,
};

type PickedProps = Pick<React.ComponentProps<typeof BkmGroupRow>, "onClick">;

interface Props extends PickedProps {
  emptyGroupTitle: string;
  groups: BkmGroup[];
  selectedGroupId: string | null;
}

export default function BkmGroupList({
  emptyGroupTitle,
  groups,
  onClick,
  selectedGroupId,
}: Props) {
  return (
    <St.Container className={"flex flex-col items-start overflow-auto"}>
      {/* special empty "no group" row */}
      <BkmGroupRow
        groupId={null}
        isSelected={selectedGroupId === null}
        onClick={onClick}
        title={emptyGroupTitle}
      />

      {groups.map((group) => (
        <BkmGroupRow
          key={group.id}
          groupId={group.id}
          isSelected={group.id === selectedGroupId}
          onClick={onClick}
        />
      ))}
    </St.Container>
  );
}
