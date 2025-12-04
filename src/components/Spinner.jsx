import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Overlay = styled.div`
  /* 1. Fix positioning to cover the whole screen */
  position: fixed;
  inset: 0;
  /* 'inset: 0' is shorthand for top: 0, right: 0, bottom: 0, left: 0 */

  /* 2. Add the background color (backdrop) */

  z-index: 10;

  /* 3. Center the spinner */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SpinnerStyle = styled.div`
  width: 60px;
  height: 60px;
  border: 6px solid rgba(255, 255, 255, 0.2);
  border-top-color: white;
  border-radius: 50%;
  animation: ${spin} 0.9s linear infinite;
`;

export default function Spinner() {
  return (
    <Overlay>
      <SpinnerStyle />
    </Overlay>
  );
}
