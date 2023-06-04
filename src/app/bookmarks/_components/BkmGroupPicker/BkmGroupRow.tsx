import React from "react";

import { clsx } from "clsx";
import styled from "@emotion/styled";

import { useBkmGroupsStore } from "@/app/bookmarks/bkmGroups.store";
import { useCountBkmByGroup } from "@/app/bookmarks/_store";
import { Icon } from "@/lib/components";
import { _ } from "@/lib/utils";

const St = {
  Container: styled.div`
    height: 44px;
  `,
};

interface Props {
  groupId?: string | null;
}

export default function BkmGroupRow({ groupId }: Props) {
  const setSelectedId = useBkmGroupsStore((state) => state.setSelectedId);

  const group = useBkmGroupsStore((state) => state.data[groupId || ""]);
  const selectedId = useBkmGroupsStore(_.prop("selectedId"));
  const isSelected = groupId === selectedId;

  const count = useCountBkmByGroup(group?.id);
  const title = group ? `${group.name} (${count})` : "All Bookmarks";

  return (
    <St.Container
      className={clsx(
        "pl-2.5 relative rounded cursor-pointer font-semibold " +
          "flex items-center justify-justify-between shrink-0 w-full",
        !isSelected && "bg-white bg-opacity-0 hover:bg-opacity-5",
        isSelected && "border border-gray-500 dark:bg-gray-600"
      )}
      onClick={() => setSelectedId(group?.id || null)}
    >
      {group?.id && <Icon className="mr-1.5" icon="folder" size={18} />}
      <div className="grow">{title}</div>
    </St.Container>
  );
}
