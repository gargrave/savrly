import {
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { CreateBkmFormContainer } from "@/app/bookmarks/_components/create";
import { Button, Icon, Modal, ModalContent } from "@/lib/components";

export default function CreateBkmModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        classes={"p-0"}
        onClick={onOpen}
        variant={"ghost"}
        title={"Open 'Create Bookmark' Modal"}
      >
        <Icon icon={"plusCircle"} size={32} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Bookmark</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <CreateBkmFormContainer onSuccess={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
