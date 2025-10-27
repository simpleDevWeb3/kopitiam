import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useOutsideClick } from "../hook/useOutsideClick";

const MenusContext = createContext();

export default function Menus({ children }) {
  const [openId, setOpenId] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function close() {
    setOpenId(null);
  }
  function open(id) {
    setOpenId(id);
  }
  return (
    <MenusContext.Provider
      value={{ openId, position, setPosition, open, close }}
    >
      <StyledMenuContainer>{children}</StyledMenuContainer>
    </MenusContext.Provider>
  );
}

function useMenus() {
  const context = useContext(MenusContext);
  if (context === undefined)
    throw new Error("useMenus is used out MenusProvider");
  return context;
}

function MenuToggle({ children, id }) {
  const { openId, open, close, setPosition } = useMenus();

  function handleClick(e) {
    console.log("------start debug---------");
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    console.log(openId);
    openId === "" || openId !== id ? open(id) : close(); //
  }

  return (
    <StyledToggle onClick={(e) => handleClick(e)}>{children}</StyledToggle>
  );
}

function MenuList({ id, children, placement }) {
  const { openId, position, close } = useMenus();

  const ref = useOutsideClick(close, false);
  console.log(id, openId);

  //1.
  //Open
  useEffect(() => {
    const el = ref.current;
    console.log(ref.current);
    if (!el) return;
    if (openId === id) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0px)";
    }
  }, [openId, id, ref]);

  if (id !== openId) return null;

  console.log("open", openId);
  return createPortal(
    <StyledMenu $placement={placement} ref={ref} position={position}>
      {children}
    </StyledMenu>,
    document.body
  );
}
function MenuBtn({ children }) {
  const { close } = useMenus();

  return (
    <StyledItem
      onClick={(e) => {
        e.stopPropagation();
        close();
      }}
    >
      {children}
    </StyledItem>
  );
}

Menus.MenuToggle = MenuToggle;
Menus.MenuList = MenuList;
Menus.MenuBtn = MenuBtn;
/* ---------- styled-components ---------- */

const StyledMenuContainer = styled.div``;

const StyledToggle = styled.span`
  border: none;
  display: flex;
  background: none;
  &:hover {
    background: none;
  }
`;

const StyledMenu = styled.ul`
  position: absolute;
  right: ${(props) =>
    props.$placement === "right"
      ? props.position.x - "65"
      : props.position.x}px;
  top: ${(props) => props.position.y}px;
  list-style: none;
  background: white;
  box-shadow: 0 5px 5px rgba(150, 147, 147, 0.1);
  border-radius: 0.5rem;
  padding: 0.4rem 0;
  margin: 0;
  width: 9rem;
  z-index: 100;

  display: flex;
  flex-direction: column;

  /* Animation styles */
  opacity: 0;
  transform: translateY(-8px);
  animation: fadeSlideIn 0.2s ease-in;

  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeSlideOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-8px);
    }
  }

  @media (max-width: 468px) {
    width: 7rem;
  }
`;

const StyledItem = styled.li`
  padding-left: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  font-size: 0.8rem;
  @media (max-width: 468px) {
    font-size: 0.6rem;
  }
`;
