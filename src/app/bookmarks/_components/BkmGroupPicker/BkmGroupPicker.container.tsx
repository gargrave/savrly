import React from "react";

import {
  Button,
  CloseButton,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

import {
  type BkmGroupsStore,
  useBkmGroupsStore,
} from "@/app/bookmarks/bkmGroups.store";
import type { BkmGroup } from "@/app/bookmarks/bookmarks.types";
import {
  useCountAllBkms,
  useCountBkmBySelectedGroup,
} from "@/app/bookmarks/_store";
import { Icon } from "@/lib/components";
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

function getFullGroupPath(groups: BkmGroupsStore["data"], groupId: string) {
  const baseGroup = groups[groupId];
  let path = baseGroup.name;
  let parent: BkmGroup | null = groups[baseGroup.parent];

  while (parent) {
    path = `${parent.name} / ${path}`;
    parent = groups[parent.parent];
  }

  return path;
}

export default function BkmGroupPickerContainer() {
  const setSelectedId = useBkmGroupsStore((state) => state.setSelectedId);
  const selectedId = useBkmGroupsStore(_.prop("selectedId"));
  const groups = useBkmGroupsStore((state) => state.data);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const countAll = useCountAllBkms();
  const countSelected = useCountBkmBySelectedGroup();
  const title = selectedId
    ? getFullGroupPath(groups, selectedId) + ` (${countSelected})`
    : `All Bookmarks (${countAll})`;

  const groupsCount = Object.values(groups).length;

  React.useEffect(() => {
    onClose();
  }, [onClose, selectedId]);

  return (
    <div className={"flex items-center"}>
      <Button className={"h-full"} onClick={onOpen} variant={"link"}>
        {selectedId && <Icon className={"mr-1.5"} icon={"folder"} size={18} />}
        <Heading as={"h3"} size={"sm"} paddingTop={"1px"}>
          {title}
        </Heading>
      </Button>

      {selectedId && <CloseButton onClick={() => setSelectedId(null)} />}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <St.ModalContent maxW={380}>
          <ModalHeader>Groups ({groupsCount})</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <BkmGroupRow groupId={null} />
            <BkmGroupList groups={Object.values(groups)} />
          </ModalBody>
        </St.ModalContent>
      </Modal>
    </div>
  );
}
