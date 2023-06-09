import type { BkmGroupsStore } from "@/app/bookmarks/_store";
import type { BkmGroup } from "@/app/bookmarks/bookmarks.types";
import { _ } from "@/lib/utils";

export function getFullGroupPath(
  groups: BkmGroupsStore["data"],
  groupId: string | null
): string {
  if (!groupId) return "";

  const baseGroup = groups[groupId];
  let path = baseGroup.name;
  let parent: BkmGroup | null = groups[baseGroup.parent || ""];

  while (parent) {
    path = `${parent.name} / ${path}`;
    parent = groups[parent.parent || ""];
  }

  return path;
}
