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
import styled from "@emotion/styled";

import { CreateBkmFormContainer } from "@/app/bookmarks/_components/create";
import { Icon } from "@/lib/components";

const St = {
  ModalContent: styled(ModalContent)`
    min-width: 351px;
  `,
};

export default function CreateBkmModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* TODO: make a wrapper Button components */}
      <Button onClick={onOpen} variant={"ghost"}>
        <Icon icon={"plusCircle"} size={32} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <St.ModalContent>
          <ModalHeader>New Bookmark</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <CreateBkmFormContainer onSuccess={onClose} />
          </ModalBody>
        </St.ModalContent>
      </Modal>
    </>
  );
}
