import React from "react";
import { Heading } from "@chakra-ui/react";

import { useBkmGroupsStore } from "../_store";
import type { Bookmark } from "../bookmarks.types";
import { getFullGroupPath } from "./bkmGroups/bkmGroups.helpers";
import BkmCard from "./BkmCard";

interface BucketHeaderProps {
  bookmarks: Bookmark[];
  groupId: string | null;
}

function BucketHeader({ bookmarks, groupId }: BucketHeaderProps) {
  const groups = useBkmGroupsStore((state) => state.data);
  const path = getFullGroupPath(groups, groupId || "") || "Ungrouped";

  return (
    <div
      className={
        "px-3 py-4 flex items-center justify-between bg-zinc-900 shadow"
      }
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
  return bookmarks?.length ? (
    <div data-testid={"BookmarkBucket"}>
      <BucketHeader bookmarks={bookmarks} groupId={groupId} />
      {bookmarks.map((bookmark) => (
        <BkmCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  ) : null;
}
