import type { BkmGroup, Bookmark } from "@/app/bookmarks/bookmarks.types";
import { fetchAll } from "@/lib/api/api";
import BookmarksContainer from "./Bookmarks.container";

export const revalidate = 0;

async function fetchData(): Promise<{
  bkmGroups: BkmGroup[];
  bookmarks: Bookmark[];
}> {
  const [bookmarks, bkmGroups] = await Promise.all([
    fetchAll<Bookmark>("bookmarks"),
    fetchAll<BkmGroup>("bkmGroups"),
  ]);
  console.log({ bookmarks });

  return {
    bookmarks,
    bkmGroups,
  };
}

export default async function BookmarksPage() {
  const { bkmGroups, bookmarks } = await fetchData();

  return (
    <main>
      <BookmarksContainer bkmGroups={bkmGroups} bookmarks={bookmarks} />
    </main>
  );
}
