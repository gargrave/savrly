import type { BkmGroup, Bookmark } from "@/app/bookmarks/bookmarks.types";
import { fetchAll } from "@/lib/api/api";
import BookmarksContainer from "./Bookmarks.container";

export const revalidate = 10;

async function fetchData(): Promise<{
  bkmGroups: BkmGroup[];
  bookmarks: Bookmark[];
}> {
  const [bookmarks, bkmGroups] = await Promise.all([
    fetchAll<Bookmark>("bookmarks"),
    fetchAll<BkmGroup>("bkmGroups"),
  ]);

  return {
    bookmarks,
    bkmGroups,
  };
}

export default async function BookmarksPage() {
  const { bkmGroups, bookmarks } = await fetchData();

  return (
    <div>
      <BookmarksContainer bkmGroups={bkmGroups} bookmarks={bookmarks} />
    </div>
  );
}
