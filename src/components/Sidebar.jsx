import {
  HiOutlineFire,
  HiOutlineHome,
  HiOutlineUserGroup,
  HiPlus,
} from "react-icons/hi";

import { HiOutlineChartBar, HiOutlineClipboardList } from "react-icons/hi";

import { NavLink } from "react-router-dom";
import styled from "styled-components";
import useSidebar from "../hook/useSidebar";
import { useEffect } from "react";
import Accordian from "./Accordian";
import { useModal } from "../context/ModalContext";
import { BiPieChart } from "react-icons/bi";
import { TbReportAnalytics } from "react-icons/tb";
import { SiDatabricks } from "react-icons/si";
import { HiOutlineUsers } from "react-icons/hi2";
import { useDashboard } from "../hook/useDashboard";
import Logo from "./Logo";
import { IoExitOutline } from "react-icons/io5";
import { MdExitToApp, MdGroups } from "react-icons/md";
import Hamburger from "./Hamburger";
import { CgCommunity } from "react-icons/cg";
import { RiCommunityFill, RiUserCommunityLine } from "react-icons/ri";

const StyledSidebar = styled.aside`
  overflow-y: scroll;
  position: fixed;
  background-color: var(--background-color);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.2rem;
  border-right: 1px solid var(--tertiary-color);
  top: ${({ $isDashboard }) => ($isDashboard ? "0" : " 3.5rem")};
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

  & * {
    color: var(--text-color);
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
    background-color: var(--hover-color);
  }
`;

const StyledNavAction = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--primary-color);
  font-size: 1rem;
  font-weight: 500;
  padding: 0.7rem 1rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background 0.2s;

  svg {
    font-size: 1.5rem;
  }

  &:hover {
    background-color: var(--hover-color);
  }
`;

function Sidebar() {
  const { openModal } = useModal();
  const { isDashboardRoute } = useDashboard();

  const {
    isSidebarOpen,
    closeSidebar,
    openSidebar,
    setIsManualOpen,
    isManualOpen,
    isManualOpenResize,
    setIsManualOpenResize,
  } = useSidebar();

  // Example communities list
  const userCommunities = [
    { id: 1, name: "Kopi Lovers" },
    { id: 2, name: "Web Dev" },
    { id: 3, name: "Gaming Hub" },
  ];

  // RESIZE HANDLING
  useEffect(() => {
    function handleResize() {
      if (isManualOpen) return;

      if (window.innerWidth < 1300) {
        if (!isManualOpenResize) {
          closeSidebar();
          setIsManualOpenResize(false);
        } else {
          openSidebar();
        }
      } else {
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

  // Auto-close sidebar on mobile
  function handleNavigate() {
    if (isManualOpenResize !== true) return;
    closeSidebar();
    setIsManualOpenResize(false);
  }

  return (
    <StyledSidebar
      $isDashboard={isDashboardRoute}
      isSidebarOpen={isSidebarOpen}
    >
      {isDashboardRoute ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <Hamburger />
            <Logo />
          </div>
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.8rem",
            }}
          >
            <StyledNavLink onClick={handleNavigate} to="/dashboard/overview">
              <SiDatabricks />
              <span>Overview</span>
            </StyledNavLink>
            <StyledNavLink onClick={handleNavigate} to="/dashboard/groups">
              <RiUserCommunityLine />
              <span>Community</span>
            </StyledNavLink>
            <StyledNavLink onClick={handleNavigate} to="/dashboard/posts">
              <HiOutlineClipboardList />
              <span>Posts</span>
            </StyledNavLink>{" "}
            <StyledNavLink onClick={handleNavigate} to="/dashboard/users">
              <HiOutlineUsers />
              <span>Users</span>
            </StyledNavLink>
          </div>
        </>
      ) : (
        <>
          {" "}
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
          <StyledNavAction onClick={() => openModal("Create Community")}>
            <HiPlus />
            <span>Start Community</span>
          </StyledNavAction>
          <br />
          <br />
          <Accordian title={"Manage"}>
            {userCommunities.map((c) => (
              <StyledNavLink
                key={c.id}
                onClick={handleNavigate}
                to={`/dashboard`}
              >
                <HiOutlineUserGroup />
                <span>{c.name}</span>
              </StyledNavLink>
            ))}
          </Accordian>
          <Accordian title={"Joined"}>
            {userCommunities.map((c) => (
              <StyledNavLink
                key={c.id}
                onClick={handleNavigate}
                to={`/dashboard`}
              >
                <HiOutlineUserGroup />
                <span>{c.name}</span>
              </StyledNavLink>
            ))}
          </Accordian>
          <Accordian title={"Followed"}>
            {userCommunities.map((c) => (
              <StyledNavLink
                key={c.id}
                onClick={handleNavigate}
                to={`/dashboard`}
              >
                <HiOutlineUserGroup />
                <span>{c.name}</span>
              </StyledNavLink>
            ))}
          </Accordian>
        </>
      )}
    </StyledSidebar>
  );
}

export default Sidebar;
