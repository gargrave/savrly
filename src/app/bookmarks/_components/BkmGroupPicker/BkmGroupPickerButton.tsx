import React from "react";

import { Button, CloseButton, Heading, useDisclosure } from "@chakra-ui/react";

import {
  type BkmGroupsStore,
  useBkmGroupsStore,
  useCountAllBkms,
  useCountBkmBySelectedGroup,
} from "@/app/bookmarks/_store";
import { type BkmGroup } from "@/app/bookmarks/bookmarks.types";
import { Icon } from "@/lib/components";

import BkmGroupPickerModal from "./BkmGroupPicker.modal";

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
      <Button className={"h-full"} onClick={disclosure.onOpen} variant={"link"}>
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
