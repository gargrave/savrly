import { Heading } from "@chakra-ui/react";
import { useBkmGroupsStore } from "../_store";
import type { BkmGroup, Bookmark } from "../bookmarks.types";
import BkmCard from "./BkmCard";

interface BucketHeaderProps {
  bookmarks: Bookmark[];
  group: BkmGroup | undefined;
}

function BucketHeader({ bookmarks, group }: BucketHeaderProps) {
  return (
    <div className="px-3 py-5 flex items-center justify-between bg-stone-900">
      <Heading as={"h4"} size={"md"}>
        {group?.name || "Ungrouped"} ({bookmarks?.length || 0})
      </Heading>
    </div>
  );
}

interface Props {
  bookmarks: Bookmark[];
  groupId: string;
}

export default function BkmBucket({ bookmarks, groupId }: Props) {
  const group = useBkmGroupsStore((state) => state.data[groupId]);

  console.log({ group });
  return (
    <>
      <BucketHeader bookmarks={bookmarks} group={group} />
      {bookmarks.map((bookmark) => (
        <BkmCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </>
  );
}
