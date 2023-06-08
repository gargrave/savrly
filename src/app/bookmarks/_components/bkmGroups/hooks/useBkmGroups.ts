import React from "react";

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

  /**
   * A map of group IDs to the number of parents they have.
   * i.e. "How deep in the tree is this group?"
   * Looks like: {
   *    'group1': 0,
   *    'group2': 2,
   * }
   */
  const groupParentCounts: Record<string, number> = React.useMemo(() => {
    const getParentCount = (id: string | null, count = -1): number =>
      id ? getParentCount(groups[id]?.parent || null, count + 1) : count;

    return Object.values(groups).reduce((accum, group) => {
      accum[group.id] = getParentCount(group.id);
      return accum;
    }, {} as Record<string, number>);
  }, [groups]);

  return {
    groups,
    groupParentCounts,
    sortedGroupKeys,
  };
}
