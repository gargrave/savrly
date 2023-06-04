import { Heading } from "@chakra-ui/react";
import styled from "@emotion/styled";

import CreateBkmModal from "@/app/bookmarks/_components/create/CreateBkm.modal";

export const HEADER_HEIGHT = 64;

const St = {
  Container: styled.header`
    height: ${HEADER_HEIGHT}px;
  `,
};

export default function BkmHeader() {
  return (
    <St.Container
      className="sticky top-0 p-3
        flex items-center justify-between
        bg-white dark:bg-zinc-800 z-10"
    >
      <Heading as={"h2"}>Bookmarks</Heading>
      <CreateBkmModal />
    </St.Container>
  );
}
