/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import styled, { css } from "styled-components";
import { useOutsideClick } from "../hook/useOutsideClick";

const DropdownContext = createContext();

export function Dropdown({ children, position = "left" }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick(close, false);
  function toggle() {
    setIsOpen((prev) => !prev);
  }

  function close() {
    setIsOpen(false);
  }

  function open() {
    setIsOpen(true);
  }

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close, open }}>
      <DropdownWrapper ref={ref} position={position}>
        {children}
      </DropdownWrapper>
    </DropdownContext.Provider>
  );
}

Dropdown.Trigger = function DropdownTrigger({ children }) {
  const { toggle } = useContext(DropdownContext);
  return <TriggerButton onClick={toggle}>{children}</TriggerButton>;
};

Dropdown.List = function DropdownList({ children, position }) {
  const { isOpen } = useContext(DropdownContext);

  if (!isOpen) return null;
  return <ListContainer position={position}>{children}</ListContainer>;
};

Dropdown.Item = function DropdownItem({ children, onClick }) {
  function handleClick() {
    if (onClick) onClick();
  }

  return <ListItem onClick={handleClick}>{children}</ListItem>;
};

export function useDropdown() {
  const ctx = useContext(DropdownContext);
  if (ctx === undefined)
    throw new Error(
      "useDropdown context is used outside the DropdownProvider! "
    );
  return ctx;
}

const DropdownWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: ${(props) => props.position};
  flex: 1;
`;

const TriggerButton = styled.div`
  width: 100%;
`;
const position = {
  left: css`
    left: 0;
  `,
  right: css`
    right: -2rem;
  `,
};
const ListContainer = styled.ul`
  position: absolute;
  top: 110%;
  ${(props) => position[props.position] || position.left};
  box-shadow: -2px 3px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  background-color: var(--secondary-color);
  border: solid 1px var(--tertiary-color);
  border-radius: 8px;
  min-width: 15rem;
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
  z-index: 1000;
  color: var(--text-color);
  text-align: left;
`;

const ListItem = styled.li`
  display: flex;
  padding: 0.6rem 1rem;
  gap: 0.5rem;
  cursor: pointer;
  transition: background-color 0.15s ease;
  text-align: center;
  align-items: center;
  &:hover {
    background-color: var(--hover-color);
  }
`;
