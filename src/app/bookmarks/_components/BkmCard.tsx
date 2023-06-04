import colors from "tailwindcss/colors";

import type { BkmGroup, Bookmark } from "@/app/bookmarks/bookmarks.types";
import { useBkmGroupsStore } from "@/app/bookmarks/bkmGroups.store";
import { ExternalLink, Icon } from "@/lib/components";
import { _, Format, format, stop } from "@/lib/utils";

const { find, pipe, values } = _;

function Dot() {
  return (
    <span className="mx-2 inline-flex items-center justify-center">·</span>
  );
}

interface Props {
  bookmark: Bookmark;
}

// TODO: edit controls
// TODO: delete controls
// TODO: loading state
export default function BkmCard({ bookmark }: Props) {
  const group = useBkmGroupsStore((state) =>
    pipe(
      values,
      find<BkmGroup>((group) => group.id === bookmark.groupId)
    )(state.data)
  );

  const urlBase = (new URL(bookmark?.url).hostname || "").replace(
    /(https?:\/\/)?www\./,
    ""
  );

  function handleGroupClick() {
    console.log(`CLICK ${bookmark.groupId}`);
  }

  return (
    <div
      className="relative flex flex-col items-start justify-between gap-0
        border-b border-gray-600 select-none cursor-pointer
        dark:bg-zinc-800 hover:dark:bg-white hover:dark:bg-opacity-10"
    >
      <div className="p-3">
        <div className="mb-1 font-semibold">{bookmark.title}</div>

        {bookmark.description && (
          <div className="mb-1 text-sm dark:text-gray-300">
            {bookmark.description}
          </div>
        )}

        {/* metadata display */}
        <div className="text-sm flex flex-wrap dark:text-gray-400">
          {group && (
            <>
              <div
                className="inline-flex hover:underline"
                onClick={stop(handleGroupClick)}
                style={{ zIndex: 1 }}
              >
                <Icon
                  className={"mr-1.5"}
                  color={colors.gray[400]}
                  icon={"folder"}
                  size={18}
                />
                <span>{group.name}</span>
              </div>
              <Dot />
            </>
          )}

          <span>{urlBase}</span>
          <Dot />
          <span>{format(bookmark.created, Format.ReadableWithTime)}</span>
        </div>
      </div>

      {/* hidden link element; makes full container clickable to open link */}
      {/* TODO: replace with LinkOverlay from Chakra? */}
      <ExternalLink
        className={"absolute fill-parent hidden-text"}
        href={bookmark.url}
      >
        {bookmark.title}
      </ExternalLink>
    </div>
  );
}
