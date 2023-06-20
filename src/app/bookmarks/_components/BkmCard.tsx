import colors from "tailwindcss/colors";

import type { BkmGroup, Bookmark } from "@/app/bookmarks/bookmarks.types";
import { useBkmGroupsStore } from "@/app/bookmarks/_store";
import EditBkmButton from "@/app/bookmarks/_components/edit/EditBkmButton";
import { ExternalLink, Icon, Spinner } from "@/lib/components";
import { _, Format, format, stop } from "@/lib/utils";
import { useRequestsStore } from "@/app/api";
import { clsx } from "clsx";

const { find, pipe, values } = _;

function Dot() {
  return (
    <span className="mx-2 inline-flex items-center justify-center">·</span>
  );
}

interface Props {
  bookmark: Bookmark;
}

// TODO: delete controls
export default function BkmCard({ bookmark }: Props) {
  const setSelectedId = useBkmGroupsStore((state) => state.setSelectedId);
  const request = useRequestsStore((state) => state.data[bookmark.id]);

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

  const isLoading = request?.state === "loading";

  return (
    <div
      data-testid={"BookmarkCard"}
      className={clsx(
        "relative gap-0 " +
          "border-b border-b-zinc-700 select-none last-of-type:border-b-0 " +
          "dark:bg-zinc-800",
        isLoading
          ? "cursor-auto pointer-events-none"
          : "cursor-pointer hover:dark:bg-zinc-300 hover:dark:bg-opacity-10"
      )}
    >
      <div className="p-3">
        <div className="mb-1 pr-8 font-semibold">{bookmark.title}</div>

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
                onClick={stop(() => setSelectedId(group.id))}
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

      <EditBkmButton bkmId={bookmark.id} />

      {/* hidden link element; makes full container clickable to open link */}
      {/* TODO: replace with LinkOverlay from Chakra? */}
      <ExternalLink
        className={"absolute fill-parent hidden-text"}
        href={bookmark.url}
      >
        {bookmark.title}
      </ExternalLink>

      {isLoading && <Spinner asOverlay size={"lg"} />}
    </div>
  );
}
