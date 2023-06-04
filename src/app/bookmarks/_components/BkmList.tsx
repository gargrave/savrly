import { useBookmarksStore } from "@/app/bookmarks/bookmarks.store";
import { Bookmark } from "@/app/bookmarks/bookmarks.types";
import { useBkmGroupsStore } from "@/app/bookmarks/bkmGroups.store";
import { _ } from "@/lib/utils";
import BkmCard from "./BkmCard";

const byUpdated = (a: Bookmark, b: Bookmark) =>
  a.updated > b.updated ? -1 : 1;

export default function BkmList() {
  // TODO: try prop here
  const selectedGroupId = useBkmGroupsStore((state) => state.selectedId);
  const bookmarks: Bookmark[] = useBookmarksStore((state) => {
    const filter = selectedGroupId
      ? (bkm: Bookmark) => bkm.groupId === selectedGroupId
      : _.always(true);

    return Object.values(state.data).filter(filter).sort(byUpdated);
  });

  return (
    <div>
      {bookmarks.map((bookmark) => (
        <BkmCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
}
