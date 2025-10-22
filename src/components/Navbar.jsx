import styled from "styled-components";
import Logo from "./Logo";

import {
  HiOutlineBell,
  HiOutlinePlusCircle,
  HiOutlineUser,
  HiOutlineUserCircle,
} from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";
import Search from "./Search";
import { useNavigate } from "react-router-dom";

const StyledNavbar = styled.nav`
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding-left: 2rem;
  padding-right: 2rem;
`;

const CreatePostIcon = styled(HiOutlinePlusCircle)`
  color: var(--primary-color);
  text-align: center;
  font-size: 1.5rem;
`;
const Notification = styled(HiOutlineBell)`
  color: var(--primary-color);
  text-align: center;
  font-size: 1.5rem;
`;
const Grouped = styled.div`
  display: flex;
  gap: 0.5rem;
  text-align: center;
  justify-content: center;
  align-items: center;
`;
const User = styled(HiOutlineUserCircle)`
  color: var(--primary-color);
  text-align: center;
  font-size: 1.5rem;
`;
function Navbar() {
  const navigate = useNavigate();
  return (
    <StyledNavbar>
      <Logo />
      <Search />

      <Grouped>
        <ButtonIcon
          icon={<CreatePostIcon />}
          action={() => navigate("/create")}
        >
          <span>Create</span>
        </ButtonIcon>

        <ButtonIcon icon={<Notification />} />
        <User />
      </Grouped>
    </StyledNavbar>
  );
}

export default Navbar;
