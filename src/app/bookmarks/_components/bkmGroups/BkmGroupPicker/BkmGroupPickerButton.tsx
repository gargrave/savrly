import React from "react";

import { CloseButton, Heading, useDisclosure } from "@chakra-ui/react";

import {
  useBkmGroupsStore,
  useCountAllBkms,
  useCountBkmBySelectedGroup,
} from "@/app/bookmarks/_store";
import { Button, Icon } from "@/lib/components";

import BkmGroupPickerModal from "./BkmGroupPicker.modal";
import { getFullGroupPath } from "../bkmGroups.helpers";

export default function BkmGroupPickerButton() {
  const setSelectedId = useBkmGroupsStore((state) => state.setSelectedId);
  const selectedId = useBkmGroupsStore((state) => state.selectedId);
  const groups = useBkmGroupsStore((state) => state.data);

  const disclosure = useDisclosure();

  const countAll = useCountAllBkms();
  const countSelected = useCountBkmBySelectedGroup();
  const title = selectedId
    ? getFullGroupPath(groups, selectedId) + ` (${countSelected})`
    : `All Bookmarks (${countAll})`;

  const handleGroupClick = React.useCallback(
    (id: string | null) => {
      setSelectedId(id);
      disclosure.onClose();
    },
    [disclosure, setSelectedId]
  );

  return (
    <div className={"flex items-center"}>
      <Button
        className={"h-full"}
        onClick={disclosure.onOpen}
        variant={"link"}
        aria-label={"Open Group Picker"}
      >
        {selectedId && <Icon className={"mr-1.5"} icon={"folder"} size={18} />}
        <Heading as={"h3"} size={"sm"} paddingTop={"1px"}>
          {title}
        </Heading>
      </Button>

      {selectedId && <CloseButton onClick={() => setSelectedId(null)} />}

      <BkmGroupPickerModal
        {...disclosure}
        onClick={handleGroupClick}
        selectedGroupId={selectedId}
      />
    </div>
  );
}
