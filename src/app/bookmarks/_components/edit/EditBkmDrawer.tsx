import React from "react";

import { UseDisclosureProps } from "@chakra-ui/react";

import { EditBkmFormContainer } from "@/app/bookmarks/_components/edit";
import {
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
  Button,
} from "@/lib/components";
import { _ } from "@/lib/utils";
import { useBookmarksUiFns } from "../hooks/useBookmarksUiFns";

interface Props extends UseDisclosureProps {
  bkmId: string;
}

export default function EditBkmDrawer({
  bkmId,
  isOpen = false,
  onClose = _.noop,
}: Props) {
  const { deleteBookmarkWithUi } = useBookmarksUiFns();
  function handleDeleteConfirm() {
    deleteBookmarkWithUi(bkmId);
    onClose();
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" size={"sm"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Update Bookmark</DrawerHeader>

        <DrawerBody className={"flex flex-col justify-between pb-4"}>
          <EditBkmFormContainer bkmId={bkmId} onSuccess={onClose} />
          <Button
            block
            colorScheme={"red"}
            confirmText={"Delete this Bookmark?"}
            onClick={handleDeleteConfirm}
          >
            Delete
          </Button>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
