import {
  HiOutlineFire,
  HiOutlineHome,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledSidebar = styled.aside`
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.2rem;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
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

function Sidebar() {
  return (
    <StyledSidebar>
      <StyledNavLink to="/" end>
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
