import React from "react";
import styled from "@emotion/styled";
import colors from "tailwindcss/colors";
import { clsx } from "clsx";

import { useRequestsStore } from "@/app/api";
import {
  useBkmGroupsStore,
  useBookmarksStore,
  useCountBkmByGroup,
} from "@/app/bookmarks/_store";
import { useBkmGroupsApi } from "@/app/bookmarks/_components/bkmGroups/hooks";
import { Button, ButtonGroup, Icon, Spinner } from "@/lib/components";
import { useToasty } from "@/lib/hooks";
import { _, stop } from "@/lib/utils";
import { getFullGroupPath } from "../bkmGroups.helpers";

const St = {
  Container: styled.div`
    height: 44px;
  `,
};

interface Props {
  groupId: string | null;
  isSelected: boolean;
  onClick: (id: string | null) => void;
  onEditClick?: (id: string | null) => void;
  showControls?: boolean;
  title?: string;
}

export default function BkmGroupRow({
  groupId,
  isSelected,
  onClick,
  onEditClick = _.noop,
  showControls = false,
  title = "All Bookmarks",
}: Props) {
  const { errorToast, successToast } = useToasty();

  const groups = useBkmGroupsStore((state) => state.data);
  const group = groups[groupId || ""];
  const count = useCountBkmByGroup(group?.id);
  const rowTitle = group
    ? `${getFullGroupPath(groups, group.id)} (${count})`
    : title;

  const removeBkmGroup = useBkmGroupsStore((state) => state.remove);
  const purgeBkmGroup = useBookmarksStore((state) => state.purgeBkmGroup);
  const request = useRequestsStore((state) => state.data[groupId || ""]);
  const { deleteBkmGroup } = useBkmGroupsApi();

  function handleDeleteClick() {
    if (!groupId) return;

    deleteBkmGroup(groupId, {
      onError: () => {
        errorToast({
          title: "Error deleting Group",
        });
      },
      onSuccess: () => {
        purgeBkmGroup(groupId);
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

      {groupId && showControls && (
        <div className={"ml-auto shrink-0"}>
          <ButtonGroup isAttached>
            <Button
              aria-label={`Edit Group ${group.name}`}
              onClick={stop(() => onEditClick(groupId))}
              size={"sm"}
              variant={"outline"}
            >
              <Icon icon={"edit"} size={20} />
            </Button>

            <Button
              aria-label={`Delete Group ${group.name}`}
              color={colors.red[400]}
              confirmText={"Delete?"}
              onClick={stop(handleDeleteClick)}
              size={"sm"}
              variant={"outline"}
            >
              <Icon icon={"trash"} size={20} />
            </Button>
          </ButtonGroup>
        </div>
      )}

      {request?.state === "loading" && <Spinner asOverlay />}
    </St.Container>
  );
}
