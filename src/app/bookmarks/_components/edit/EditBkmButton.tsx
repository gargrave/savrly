import { useDisclosure } from "@chakra-ui/react";
import { clsx } from "clsx";

import EditBkmDrawer from "@/app/bookmarks/_components/edit/EditBkm.drawer";
import { Button, Icon } from "@/lib/components";
import { stop } from "@/lib/utils";

interface Props {
  bkmId: string;
  className?: string;
}

export default function EditBkmButton({ bkmId, className }: Props) {
  const disclosure = useDisclosure();

  return (
    <>
      <Button
        aria-label={"Edit Bookmark"}
        className={clsx(className)}
        onClick={stop(disclosure.onOpen)}
        size={"sm"}
        variant={"ghost"}
      >
        <Icon icon={"edit"} size={24} />
      </Button>

      <EditBkmDrawer {...disclosure} bkmId={bkmId} />
    </>
  );
}
