import { Drawer as ChDrawer, DrawerProps } from "@chakra-ui/react";
import styled from "@emotion/styled";

const MAX_W = 448;
const MIN_BUFFER = 44;

const St = {
  Drawer: styled(ChDrawer)`
    max-width: unset;
    width: min(${MAX_W}px, calc(100vw - ${MIN_BUFFER}px));
  `,
};

interface Props extends DrawerProps {}

export default function Drawer(props: Props) {
  return (
    <St.Drawer {...props} returnFocusOnClose={false}>
      {props.children}
    </St.Drawer>
  );
}
