import { useBkmGroupsStore, useBookmarksStore } from "@/app/bookmarks/_store";
import { Bookmark } from "@/app/bookmarks/bookmarks.types";
import { _ } from "@/lib/utils";
import BkmCard from "./BkmCard";
import BkmBucket from "./BkmBucket";

const sortByUpdated = (a: Bookmark, b: Bookmark) =>
  a.updated > b.updated ? -1 : 1;

export default function BkmList() {
  const selectedGroupId = useBkmGroupsStore(_.prop("selectedId"));

  const bookmarks: Bookmark[] = useBookmarksStore((state) => {
    const filterBySelectedGroup = selectedGroupId
      ? (bkm: Bookmark) => bkm.groupId === selectedGroupId
      : _.always(true);

    return _.pipe(
      _.values,
      _.filter(filterBySelectedGroup)
    )(state.data).sort(sortByUpdated);
  });

  const bookmarkBuckets = useBookmarksStore((state) => {
    const filterBySelectedGroup = selectedGroupId
      ? (bkm: Bookmark) => bkm.groupId === selectedGroupId
      : _.always(true);

    return _.pipe(
      _.values,
      _.filter(filterBySelectedGroup),
      _.groupBy<Bookmark>("groupId")
    )(state.data);
  });

  return selectedGroupId
    ? bookmarks.map((bookmark) => (
        <BkmCard key={bookmark.id} bookmark={bookmark} />
      ))
    : Object.keys(bookmarkBuckets).map((groupId) => {
        return (
          <BkmBucket
            key={groupId}
            bookmarks={bookmarkBuckets[groupId]}
            groupId={groupId}
          />
        );
      });
}
