import {
  HiOutlineFire,
  HiOutlineHome,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import useSidebar from "../hook/useSidebar";

import { useEffect } from "react";

const StyledSidebar = styled.aside`
  position: fixed;
  background-color: var(--background-color);
  display: flex;
  flex-direction: column;
  padding: 1rem;

  gap: 0.2rem;
  border-right: 1px solid var(--tertiary-color);
  top: 3.5rem;
  bottom: 0;
  z-index: 99;
  width: 100%;
  max-width: 17rem;

  transform: ${(props) =>
    props.isSidebarOpen ? "translateX(0rem)" : "translateX(-20rem)"};

  transition: transform 0.4s ease, background-color 0.15s ease;

  @media (max-width: 1300px) {
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
    background-color: var(--hover-color);

    color: var(--primary-color);
  }

  svg {
    font-size: 1.5rem;
  }

  &:hover {
    background-color: var(
      --hover-color
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

  function handleNavigate() {
    if (isManualOpenResize !== true) return;
    closeSidebar();
    setIsManualOpenResize(false);
  }
  return (
    <StyledSidebar isSidebarOpen={isSidebarOpen}>
      <StyledNavLink onClick={handleNavigate} to="/">
        <HiOutlineHome />
        <span>Home</span>
      </StyledNavLink>

      <StyledNavLink onClick={handleNavigate} to="/popular">
        <HiOutlineFire />
        <span>Popular</span>
      </StyledNavLink>

      <StyledNavLink onClick={handleNavigate} to="/communities">
        <HiOutlineUserGroup />
        <span>Communities</span>
      </StyledNavLink>
    </StyledSidebar>
  );
}

export default Sidebar;
