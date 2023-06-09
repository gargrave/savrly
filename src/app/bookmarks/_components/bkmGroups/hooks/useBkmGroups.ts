import { useBkmGroupsStore } from "@/app/bookmarks/_store";
import type { BkmGroup } from "@/app/bookmarks/bookmarks.types";
import { _ } from "@/lib/utils";
import { getFullGroupPath } from "../bkmGroups.helpers";

export function useBkmGroups() {
  const groups = useBkmGroupsStore((state) => state.data);

  const sortedGroupKeys = useBkmGroupsStore((state) => {
    const orderByFullPath = (group: BkmGroup) =>
      getFullGroupPath(state.data, group.id);

    return [
      null, // null as first element for "ungrouped" bucket
      ..._.pipe(
        _.values,
        _.orderBy(orderByFullPath, ["asc"]),
        _.map(_.prop("id"))
      )(state.data),
    ];
  });

  return {
    groups,
    sortedGroupKeys,
  };
}
