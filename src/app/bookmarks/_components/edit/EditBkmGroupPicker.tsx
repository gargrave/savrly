import React from "react";

import { useDisclosure } from "@chakra-ui/react";

import { useBkmGroupsStore } from "@/app/bookmarks/_store";
import { BkmGroupPickerModal } from "@/app/bookmarks/_components/bkmGroups";
import { InputFieldTrigger } from "@/lib/components";

interface Props {
  groupId: string | null;
  isLoading: boolean;
  label?: string;
  onChange: (id: string | null) => void;
  placeholder?: string;
}

export default function EditBkmGroupPicker({
  groupId,
  isLoading,
  label = "Group",
  onChange,
  placeholder = "No Group",
}: Props) {
  const groupCount = useBkmGroupsStore(
    (state) => Object.keys(state.data || {}).length
  );
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
        label={label}
        name={"groupId"}
        onClick={disclosure.onOpen}
        placeholder={placeholder}
        value={groupId || ""}
        isReadOnly
      />

      <BkmGroupPickerModal
        {...disclosure}
        emptyGroupTitle={placeholder}
        onClick={handleGroupClick}
        selectedGroupId={groupId}
        title={`Choose Group (${groupCount})`}
      />
    </>
  );
}
