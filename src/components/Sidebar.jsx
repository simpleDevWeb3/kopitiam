import {
  HiOutlineFire,
  HiOutlineHome,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import useSidebar from "../hook/useSidebar";
import Menu from "./Menu";
import Logo from "./Logo";
import { useEffect } from "react";

const StyledSidebar = styled.aside`
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.2rem;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  height: 100%;

  /* For screens smaller than 1300px, allow toggle */
  @media (max-width: 1300px) {
    position: absolute; /* overlay content */
    top: 0; /* adjust if you have header */
    bottom: 0;
    left: 0;
    width: 250px;
    height: 100%;
    z-index: 1000;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--primary-color);
  font-size: 1rem;
  font-weight: 500;
  padding: 0.7rem 1rem;
  border-radius: var(--border-radius);
  transition: background 0.2s;

  &.active {
    background-color: var(--secondary-color);

    color: var(--primary-color);
  }

  svg {
    font-size: 1.5rem;
  }

  &:hover {
    background-color: var(
      --secondary-color
    ); /* soft hover or use var(--background-color) */
  }
`;

const StyledRow = styled.div`
  display: flex;
  align-items: center;
`;

function Sidebar() {
  const {
    isSidebarOpen,
    closeSidebar,
    openSidebar,
    setIsManualOpen,
    isManualOpen,
    isManualOpenResize,
    setIsManualOpenResize,
  } = useSidebar();
  console.log(isSidebarOpen);
  useEffect(() => {
    function handleResize() {
      console.log(window.innerWidth);
      if (isManualOpen) return;

      if (window.innerWidth < 1300) {
        if (!isManualOpenResize) {
          closeSidebar();
          setIsManualOpenResize(false);
        } else {
          openSidebar();
        }
      } else if (window.innerWidth > 1300) {
        setIsManualOpenResize(false);
        openSidebar();
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [
    closeSidebar,
    openSidebar,
    setIsManualOpen,
    isManualOpen,
    isManualOpenResize,
    setIsManualOpenResize,
  ]);

  if (!isSidebarOpen) return;
  return (
    <StyledSidebar>
      <StyledNavLink to="/">
        <HiOutlineHome />
        <span>Home</span>
      </StyledNavLink>

      <StyledNavLink to="/popular">
        <HiOutlineFire />
        <span>Popular</span>
      </StyledNavLink>

      <StyledNavLink to="/communitiest">
        <HiOutlineUserGroup />
        <span>Communities</span>
      </StyledNavLink>
    </StyledSidebar>
  );
}

export default Sidebar;
