import React from "react";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  type UseDisclosureProps,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

import { useBkmGroupsStore } from "@/app/bookmarks/_store";
import { _ } from "@/lib/utils";

import BkmGroupList from "./BkmGroupList";
import BkmGroupRow from "./BkmGroupRow";

const St = {
  ModalContent: styled(ModalContent)<{ maxW: number }>`
    max-height: 80vh;
    max-width: ${(props) => `min(calc(100% - 12px * 2), ${props.maxW}px)`};
    min-width: 351px;
  `,
};

interface Props extends UseDisclosureProps {
  emptyGroupTitle?: string;
  onClick: (id: string | null) => void;
  selectedGroupId: string | null;
  title?: string;
}

export default function BkmGroupPickerModal({
  emptyGroupTitle,
  isOpen = false,
  onClose = _.noop,
  onClick,
  selectedGroupId,
  title,
}: Props) {
  const groups = useBkmGroupsStore((state) => Object.values(state.data));
  const modalTitle = title || `Groups (${groups.length})`;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <St.ModalContent maxW={380}>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {/* special empty "no group" row */}
          <BkmGroupRow
            groupId={null}
            isSelected={selectedGroupId === null}
            onClick={onClick}
            title={emptyGroupTitle}
          />

          <BkmGroupList
            selectedGroupId={selectedGroupId}
            groups={groups}
            onClick={onClick}
          />
        </ModalBody>
      </St.ModalContent>
    </Modal>
  );
}
