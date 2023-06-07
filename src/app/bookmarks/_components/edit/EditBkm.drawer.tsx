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
} from "@/lib/components";
import { _ } from "@/lib/utils";

interface Props extends UseDisclosureProps {
  bkmId: string;
}

const EditBkmDrawer = React.memo(
  ({ bkmId, isOpen = false, onClose = _.noop }: Props) => {
    return (
      <Drawer isOpen={isOpen} onClose={onClose} placement="right" size={"sm"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Update Bookmark</DrawerHeader>

          <DrawerBody>
            <EditBkmFormContainer bkmId={bkmId} onSuccess={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  }
);

EditBkmDrawer.displayName = "EditBkmDrawer";
export default EditBkmDrawer;
