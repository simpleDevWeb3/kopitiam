import styled from "styled-components";
import { useModal } from "../context/ModalContext";
import { CgClose } from "react-icons/cg";
import { HiOutlineXCircle } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";

function Modal({ children }) {
  const { isModalOpen, closeModal } = useModal();
  if (!isModalOpen) return null;

  return (
    <>
      <OverlayDiv onClick={closeModal} />

      <ModalContainer>
        <CloseButtonWrapper>
          <ButtonIcon
            variant="text"
            size="rounded"
            icon={<CrossIcon />}
            action={closeModal}
          />
        </CloseButtonWrapper>
        {children || <h1>Modal</h1>}
      </ModalContainer>
    </>
  );
}

export default Modal;
const CrossIcon = styled(HiOutlineXCircle)`
  color: red;
  font-size: 1.5rem;
`;
const OverlayDiv = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 900;
  width: 100%;
  height: 100%;
`;

const Right = styled.div`
  display: flex;
  align-items: right;
  justify-content: right;
  width: 100%;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--background-color);
  border-radius: 8px;
  padding: 2rem;
  z-index: 1000;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.3);
`;

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
`;
