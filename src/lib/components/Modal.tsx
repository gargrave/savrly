import {
  Modal as ChModal,
  ModalContent as ChModalContent,
  ModalProps,
} from "@chakra-ui/modal";
import styled from "@emotion/styled";
import colors from "tailwindcss/colors";

export const ModalContent = styled(ChModalContent)`
  background-color: ${colors.zinc[800]};
  max-height: 80vh;
  max-width: min(calc(100vw - 12px * 2), 448px);
  min-width: 351px;
  width: max-content;
`;

const St = {
  Modal: styled<any>(ChModal)`
    min-width: 351px;

    @media only screen and (max-width: 448px) {
      max-width: min(calc(100vw - 12px * 2), 448px);
    }
  `,
};

interface Props extends ModalProps {
  maxWidth?: number;
}

export function Modal(props: Props) {
  return <St.Modal {...props}>{props.children}</St.Modal>;
}
