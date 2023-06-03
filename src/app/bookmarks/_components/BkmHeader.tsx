import { Heading } from "@chakra-ui/react";
import CreateBkmModal from "@/app/bookmarks/_components/create/CreateBkm.modal";

export default function BkmHeader() {
  return (
    <header
      className="sticky top-0 p-3
        flex justify-between
        bg-white dark:bg-zinc-900 z-10"
    >
      <Heading as={"h2"}>Bookmarks</Heading>
      <CreateBkmModal />
    </header>
  );
}
