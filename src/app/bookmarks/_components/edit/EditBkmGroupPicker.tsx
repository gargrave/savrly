import React from "react";

import { useDisclosure } from "@chakra-ui/react";

import { useBkmGroupsStore } from "@/app/bookmarks/_store";
import { BkmGroupPickerModal } from "@/app/bookmarks/_components/BkmGroupPicker";
import { InputFieldTrigger } from "@/lib/components";

interface Props {
  groupId: string | null;
  isLoading: boolean;
  onChange: (id: string | null) => void;
}

export default function EditBkmGroupPicker({
  groupId,
  isLoading,
  onChange,
}: Props) {
  const groupName = useBkmGroupsStore((state) => {
    const group = state.data[groupId || ""];
    return group?.name || "";
  });

  const disclosure = useDisclosure();

  const handleGroupClick = React.useCallback(
    (id: string | null) => {
      onChange(id);
      disclosure.onClose();
    },
    [disclosure, onChange]
  );

  return (
    <>
      <InputFieldTrigger
        displayValue={groupName}
        isRequired
        isDisabled={isLoading}
        label={"Group"}
        name={"groupId"}
        onClick={disclosure.onOpen}
        placeholder={"No Group"}
        value={groupId || ""}
        isReadOnly
      />

      <BkmGroupPickerModal
        {...disclosure}
        emptyGroupTitle={"No Group"}
        onClick={handleGroupClick}
        selectedGroupId={groupId}
        title={"Choose Group"}
      />
    </>
  );
}
