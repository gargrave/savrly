import {
  Modal as ChModal,
  ModalContent as ChModalContent,
  ModalProps,
} from "@chakra-ui/modal";
import styled from "@emotion/styled";

export const ModalContent = styled(ChModalContent)`
  max-height: 80vh;
  max-width: min(calc(100vw - 12px * 2), 448px);
  min-width: 351px;
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
