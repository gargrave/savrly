import React from "react";

import {
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  type UseDisclosureProps,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

import { CreateBkmGroupFormContainer } from "@/app/bookmarks/_components/bkmGroups/create";
import { useBkmGroupsStore } from "@/app/bookmarks/_store";
import { _ } from "@/lib/utils";

import BkmGroupList from "./BkmGroupList";

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
  emptyGroupTitle = "All Bookmarks",
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
          <BkmGroupList
            emptyGroupTitle={emptyGroupTitle}
            selectedGroupId={selectedGroupId}
            groups={groups}
            onClick={onClick}
          />

          <Divider className={"mt-2 mb-4 border-zinc-500"} />
          {/* TODO: add option to hide this? */}
          <CreateBkmGroupFormContainer />
        </ModalBody>
      </St.ModalContent>
    </Modal>
  );
}
