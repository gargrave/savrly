import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { CreateBkmFormContainer } from "@/app/bookmarks/_components/create";
import { Icon } from "@/lib/components";

export default function CreateBkmModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* TODO: make a wrapper Button components */}
      <Button onClick={onOpen} variant={"ghost"}>
        <Icon icon={"plusCircle"} size={8} />
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
