import React from "react";

import styled from "@emotion/styled";
import { clsx } from "clsx";

import { useBkmGroupsStore, useCountBkmByGroup } from "@/app/bookmarks/_store";
import { Icon } from "@/lib/components";

const St = {
  Container: styled.div`
    height: 44px;
  `,
};

interface Props {
  groupId: string | null;
  isSelected: boolean;
  onClick: (id: string | null) => void;
  title?: string;
}

export default function BkmGroupRow({
  groupId,
  isSelected,
  onClick,
  title = "All Bookmarks",
}: Props) {
  const group = useBkmGroupsStore((state) => state.data[groupId || ""]);
  const count = useCountBkmByGroup(group?.id);
  const rowTitle = group ? `${group.name} (${count})` : title;

  return (
    <St.Container
      className={clsx(
        "pl-2.5 relative rounded cursor-pointer font-semibold " +
          "flex items-center justify-justify-between shrink-0 w-full",
        !isSelected && "bg-white bg-opacity-0 hover:bg-opacity-5",
        isSelected && "border border-gray-500 dark:bg-gray-600"
      )}
      onClick={() => onClick(groupId)}
    >
      {group?.id && <Icon className="mr-1.5" icon="folder" size={18} />}
      <div className="grow">{rowTitle}</div>
    </St.Container>
  );
}
