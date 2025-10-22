import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  color: var(--primary-color);
  font-size: 1rem;
  background: none;
  border: none;
  cursor: pointer;

  padding: 0.5rem 1rem;
  border-radius: 25px;
  &:hover {
    background-color: var(--secondary-color);
    transition: background 0.2s;
  }
  span {
    font-weight: 700;
  }
`;

function ButtonIcon({ icon, children, action }) {
  return (
    <StyledButton onClick={action}>
      {icon} {children}
    </StyledButton>
  );
}

export default ButtonIcon;
