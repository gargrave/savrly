import {
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  UseDisclosureProps,
} from "@chakra-ui/react";

import { Modal, ModalContent } from "@/lib/components";
import { _ } from "@/lib/utils";
import EditBkmGroupFormContainer from "./EditBkmGroupForm.container";

interface Props extends UseDisclosureProps {
  groupId: string;
}

export default function EditBkmGroupModal({
  groupId,
  isOpen = false,
  onClose = _.noop,
}: Props) {
  return groupId ? (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Group</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <EditBkmGroupFormContainer groupId={groupId} onSuccess={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  ) : null;
}
