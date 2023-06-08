import React from "react";
import { Heading } from "@chakra-ui/react";

import { useBkmGroupsStore } from "../_store";
import type { Bookmark } from "../bookmarks.types";
import { getFullGroupPath } from "./bkmGroups/bkmGroups.helpers";
import BkmCard from "./BkmCard";

interface BucketHeaderProps {
  bookmarks: Bookmark[];
  groupId: string | null;
  onClick: () => void;
}

function BucketHeader({ bookmarks, groupId, onClick }: BucketHeaderProps) {
  const groups = useBkmGroupsStore((state) => state.data);
  const path = getFullGroupPath(groups, groupId || "") || "Ungrouped";

  return (
    <div
      className="px-3 py-5 flex items-center justify-between bg-zinc-900 
        border-b border-gray-600 select-none cursor-pointer"
      onClick={onClick}
    >
      <Heading as={"h4"} size={"md"}>
        {path} ({bookmarks?.length || 0})
      </Heading>
    </div>
  );
}

interface Props {
  bookmarks: Bookmark[];
  groupId: string;
}

export default function BkmBucket({ bookmarks, groupId }: Props) {
  const [expanded, setExpanded] = React.useState(true);

  return bookmarks?.length ? (
    <>
      <BucketHeader
        bookmarks={bookmarks}
        groupId={groupId}
        onClick={() => setExpanded((prev) => !prev)}
      />
      {expanded &&
        bookmarks.map((bookmark) => (
          <BkmCard key={bookmark.id} bookmark={bookmark} />
        ))}
    </>
  ) : null;
}
