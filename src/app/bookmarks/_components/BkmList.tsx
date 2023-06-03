import { useBookmarksStore } from "@/app/bookmarks/bookmarks.store";
import { Bookmark } from "@/app/bookmarks/bookmarks.types";
import BkmCard from "./BkmCard";

const byUpdated = (a: Bookmark, b: Bookmark) =>
  a.updated > b.updated ? -1 : 1;

export default function BkmList() {
  const bookmarks: Bookmark[] = useBookmarksStore((state) => {
    return Object.values(state.data).sort(byUpdated);
  });

  return (
    <div>
      {bookmarks.map((bookmark) => (
        <BkmCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
}
