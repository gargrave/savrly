import {
  Drawer as ChDrawer,
  DrawerContent as ChDrawerContent,
  DrawerProps,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

export {
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
} from "@chakra-ui/react";

export const DrawerContent = styled(ChDrawerContent)`
  @media only screen and (max-width: 448px) {
    max-width: calc(100vw - 44px);
  }
`;

const St = {
  Drawer: styled(ChDrawer)`
    max-width: calc(100vw - 44px);
  `,
};

interface Props extends DrawerProps {}

export function Drawer(props: Props) {
  return (
    <St.Drawer {...props} returnFocusOnClose={false}>
      {props.children}
    </St.Drawer>
  );
}
