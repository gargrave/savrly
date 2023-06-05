import { useBkmGroupsStore, useBookmarksStore } from "@/app/bookmarks/_store";
import { Bookmark } from "@/app/bookmarks/bookmarks.types";
import { _ } from "@/lib/utils";
import BkmCard from "./BkmCard";

const byUpdated = (a: Bookmark, b: Bookmark) =>
  a.updated > b.updated ? -1 : 1;

export default function BkmList() {
  const selectedGroupId = useBkmGroupsStore(_.prop("selectedId"));

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
