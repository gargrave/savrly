import React from "react";
import {
  Divider,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  type UseDisclosureProps,
} from "@chakra-ui/react";

import { useBkmGroupsStore } from "@/app/bookmarks/_store";
import { CreateBkmGroupFormContainer } from "@/app/bookmarks/_components/bkmGroups/create";
import { Button, Modal, ModalContent } from "@/lib/components";
import { _ } from "@/lib/utils";
import BkmGroupList from "./BkmGroupList";

interface Props extends UseDisclosureProps {
  editable?: boolean;
  emptyGroupTitle?: string;
  onClick: (id: string | null) => void;
  selectedGroupId: string | null;
  title?: string;
}

export default function BkmGroupPickerModal({
  editable = true,
  emptyGroupTitle = "All Bookmarks",
  isOpen = false,
  onClose = _.noop,
  onClick,
  selectedGroupId,
  title,
}: Props) {
  const groups = useBkmGroupsStore((state) => Object.values(state.data));
  const modalTitle = title || `Groups (${groups.length})`;

  const [isEditing, setEditing] = React.useState(false);
  const buttonText = isEditing ? "Cancel" : "Edit";

  React.useEffect(() => {
    if (!isOpen) {
      setEditing(false);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={380}>
        <ModalHeader className={"flex items-center gap-2"}>
          <span>{modalTitle}</span>
          {editable && (
            <Button
              className={"dark:text-zinc-300"}
              onClick={() => setEditing((prev) => !prev)}
              size={"sm"}
              variant={"ghost"}
            >
              {buttonText}
            </Button>
          )}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <BkmGroupList
            emptyGroupTitle={emptyGroupTitle}
            onClick={onClick}
            selectedGroupId={selectedGroupId}
            showControls={isEditing}
          />

          {isEditing && (
            <>
              <Divider className={"my-4 border-zinc-500"} />
              <CreateBkmGroupFormContainer />
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
