import { useBkmGroupsStore, useBookmarksStore } from "@/app/bookmarks/_store";
import type { Bookmark } from "@/app/bookmarks/bookmarks.types";
import { _ } from "@/lib/utils";
import { useBkmGroups } from "./bkmGroups/hooks";
import BkmCard from "./BkmCard";
import BkmBucket from "./BkmBucket";

export default function BkmList() {
  const selectedGroupId = useBkmGroupsStore(_.prop("selectedId"));
  const { sortedGroupKeys } = useBkmGroups();

  const filterBySelectedGroup = selectedGroupId
    ? (bkm: Bookmark) => bkm.groupId === selectedGroupId
    : _.always(true);

  // TODO: move a bunch of this selector logic into a hook
  const bookmarks: Bookmark[] = useBookmarksStore(
    (state) =>
      _.pipe(
        _.values,
        _.filter(filterBySelectedGroup),
        _.orderBy(["updated"], ["desc"])
      )(state.data) as Bookmark[]
  );

  const bookmarkBuckets = useBookmarksStore((state) =>
    _.pipe(
      _.values,
      _.filter(filterBySelectedGroup),
      _.orderBy(["updated"], ["desc"]),
      _.groupBy<Bookmark>("groupId")
    )(state.data)
  );

  return selectedGroupId
    ? bookmarks.map((bookmark) => (
        <BkmCard key={bookmark.id} bookmark={bookmark} />
      ))
    : sortedGroupKeys.map((groupId) => {
        return (
          <BkmBucket
            key={groupId}
            bookmarks={bookmarkBuckets[groupId]}
            groupId={groupId}
          />
        );
      });
}
