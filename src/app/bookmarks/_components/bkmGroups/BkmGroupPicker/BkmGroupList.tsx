import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import styled from "@emotion/styled";

import type { BkmGroup } from "@/app/bookmarks/bookmarks.types";
import EditBkmGroupModal from "@/app/bookmarks/_components/bkmGroups/edit/EditBkmGroup.modal";
import { useBkmGroups } from "../hooks";
import BkmGroupRow from "./BkmGroupRow";

const St = {
  Container: styled.div`
    max-height: 40vh;
  `,
};

type PickedProps = Pick<
  React.ComponentProps<typeof BkmGroupRow>,
  "onClick" | "showControls"
>;

interface Props extends PickedProps {
  emptyGroupTitle: string;
  selectedGroupId: string | null;
}

export default function BkmGroupList({
  emptyGroupTitle,
  onClick,
  selectedGroupId,
  showControls,
}: Props) {
  const disclosure = useDisclosure();

  const { groups, sortedGroupKeys } = useBkmGroups();
  const [editingId, setEditingId] = React.useState<string | null>(null);

  const handleEditClick = React.useCallback(
    (id: string | null) => {
      setEditingId(id);
      disclosure.onOpen();
    },
    [disclosure]
  );

  return (
    <>
      <St.Container className={"mb-2 flex flex-col items-start overflow-auto"}>
        {/* special empty "no group" row */}
        <BkmGroupRow
          groupId={null}
          isSelected={selectedGroupId === null}
          onClick={onClick}
          title={emptyGroupTitle}
        />

        {sortedGroupKeys.map((groupId) => {
          const group = groups[groupId];
          return group ? (
            <BkmGroupRow
              key={group.id}
              groupId={group.id}
              isSelected={group.id === selectedGroupId}
              onClick={onClick}
              onEditClick={handleEditClick}
              showControls={showControls}
            />
          ) : null;
        })}

        <EditBkmGroupModal {...disclosure} groupId={editingId || ""} />
      </St.Container>
    </>
  );
}
