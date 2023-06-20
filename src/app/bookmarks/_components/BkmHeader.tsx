import { Heading } from "@chakra-ui/react";
import { clsx } from "clsx";

import CreateBkmModal from "@/app/bookmarks/_components/create/CreateBkm.modal";

export const HEADER_HEIGHT = 64;

export default function BkmHeader() {
  return (
    <header
      className={clsx(
        "p-3 sticky top-0 flex items-center justify-between bg-white dark:bg-zinc-800 z-20",
        `h-[${HEADER_HEIGHT}px]`
      )}
    >
      <Heading as={"h2"}>Bookmarks</Heading>
      <CreateBkmModal />
    </header>
  );
}
