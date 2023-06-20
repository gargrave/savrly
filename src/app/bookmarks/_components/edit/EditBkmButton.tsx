import { useDisclosure } from "@chakra-ui/react";
import { clsx } from "clsx";

import EditBkmDrawer from "@/app/bookmarks/_components/edit/EditBkmDrawer";
import { Button, Icon } from "@/lib/components";
import { stop } from "@/lib/utils";

interface Props {
  bkmId: string;
}

export default function EditBkmButton({ bkmId }: Props) {
  const disclosure = useDisclosure();

  return (
    <>
      <Button
        aria-label={"Edit Bookmark"}
        className={clsx(
          "absolute top-2 right-2 dark:text-zinc-600 hover:dark:text-zinc-500 z-10"
        )}
        onClick={stop(disclosure.onOpen)}
        size={"sm"}
        variant={"ghost"}
      >
        <Icon icon={"menu"} size={26} />
      </Button>

      <EditBkmDrawer {...disclosure} bkmId={bkmId} />
    </>
  );
}
