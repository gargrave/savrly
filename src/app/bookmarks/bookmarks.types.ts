import type { ApiResource } from "@/lib/api";

//------------------------------------------------
// Bookmarks Types
//------------------------------------------------
export interface BookmarkFields {
  description: string | null;
  groupId: string | null;
  title: string;
  url: string;
}

export type BkmPatchData = Pick<BookmarkFields, "groupId" | "title" | "url">;

export type BookmarkPostData = Pick<BookmarkFields, "url">;

export interface Bookmark extends ApiResource, BookmarkFields {}

//------------------------------------------------
// Bookmarks Groups Types
//------------------------------------------------
export interface BkmGroupFields extends ApiResource {
  name: string;
  parent: string | null;
}

export type BkmGroupPatchData = Pick<BkmGroupFields, "name" | "parent">;

export type BkmGroupPostData = Pick<BkmGroupFields, "name">;

export interface BkmGroup extends ApiResource, BkmGroupFields {}
