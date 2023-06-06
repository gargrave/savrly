import React from "react";

import styled from "@emotion/styled";
import colors from "tailwindcss/colors";
import { clsx } from "clsx";

import { useRequestsStore } from "@/app/api";
import { useBkmGroupsStore, useCountBkmByGroup } from "@/app/bookmarks/_store";
import useBkmGroupsApi from "@/app/bookmarks/_components/bkmGroups/hooks/useBkmGroupsApi";
import { Button, Icon, Spinner } from "@/lib/components";
import { useToasty } from "@/lib/hooks";
import { stop } from "@/lib/utils";

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
  const { errorToast, successToast } = useToasty();

  const group = useBkmGroupsStore((state) => state.data[groupId || ""]);
  const count = useCountBkmByGroup(group?.id);
  const rowTitle = group ? `${group.name} (${count})` : title;

  const removeBkmGroup = useBkmGroupsStore((state) => state.remove);
  const request = useRequestsStore((state) => state.data[groupId || ""]);
  const { deleteBkmGroup } = useBkmGroupsApi();

  function handleDeleteClick() {
    if (!groupId) return;

    // TODO: confirm before sending DELETE request

    deleteBkmGroup(groupId, {
      onError: () => {
        errorToast({
          title: "Error deleting Group",
        });
      },
      onSuccess: () => {
        removeBkmGroup(groupId);
        successToast({
          title: "Group deleted",
        });
      },
    });
  }

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
      <div className="truncate">{rowTitle}</div>

      {groupId && (
        <div className={"ml-auto"}>
          <Button
            aria-label={`Delete Group ${group.name}`}
            color={colors.red[400]}
            onClick={stop(handleDeleteClick)}
            size={"sm"}
            variant={"ghost"}
          >
            <Icon icon={"trash"} size={20} />
          </Button>
        </div>
      )}

      {request?.state === "loading" && <Spinner asOverlay />}
    </St.Container>
  );
}
