import type { ApiResource } from "@/lib/api";

export interface BookmarkFields {
  description: string | null;
  groupId: string | null;
  title: string;
  url: string;
}

export type BkmPatchData = Pick<BookmarkFields, "groupId" | "title" | "url">;

export type BookmarkPostData = Pick<BookmarkFields, "url">;

export interface Bookmark extends ApiResource, BookmarkFields {}

export interface BkmGroup extends ApiResource {
  name: string;
  parent: string;
}
