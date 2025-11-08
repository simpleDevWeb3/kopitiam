import styled from "styled-components";
import Logo from "./Logo";

import {
  HiOutlineBell,
  HiOutlineMenu,
  HiOutlinePlusCircle,
  HiOutlineUser,
  HiOutlineUserCircle,
} from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";
import Search from "./Search";
import { useNavigate } from "react-router-dom";
import Hamburger from "./Hamburger";
import { useModal } from "../context/ModalContext";
import { useAuth } from "../features/Auth/AuthContext";
import { Dropdown } from "./Dropdown";
import { BiMoon, BiSolidDoorOpen } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { useDarkTheme } from "../context/DarkThemeContext";
import { LiaDoorOpenSolid } from "react-icons/lia";

const StyledNavbar = styled.nav`
  position: fixed;
  display: flex;
  width: 100%;
  border-bottom: 2px solid var(--tertiary-color);
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding-left: 1rem;
  padding-right: 2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  gap: 0.7rem;
  background-color: var(--background-color);
  max-height: 3.5rem;
  z-index: 99;
  transition: background-color 0.15s ease-in;
`;
const IconText = styled.span`
  @media (max-width: 468px) {
    display: none;
  }
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

  text-align: center;
  justify-content: center;
  align-items: center;
`;
const User = styled(HiOutlineUserCircle)`
  color: var(--primary-color);
  text-align: center;
  font-size: 1.7rem;
`;

const SearchContainer = styled.div`
  display: flex;
  max-width: 30rem;
  width: 100%;
`;
function Navbar() {
  const navigate = useNavigate();
  const { toggleModal } = useModal();
  const { isAuth } = useAuth();
  const { isDarkMode, toggleMode } = useDarkTheme();
  const { logOut } = useAuth();
  return (
    <StyledNavbar>
      <Grouped>
        <Hamburger />
        <Logo />
      </Grouped>

      <SearchContainer>
        <Dropdown position="center">
          <Search />
        </Dropdown>
      </SearchContainer>

      <Grouped>
        {!isAuth ? (
          <ButtonIcon action={() => toggleModal()}>
            <IconText>Log In</IconText>
          </ButtonIcon>
        ) : (
          <>
            <ButtonIcon
              variant="text"
              icon={<CreatePostIcon />}
              action={() => navigate("/create")}
            >
              <IconText>Create</IconText>
            </ButtonIcon>

            <ButtonIcon
              size="rounded"
              variant="text"
              icon={<Notification />}
              action={() => navigate("/notification")}
            />
            <Dropdown>
              <Dropdown.Trigger>
                <ButtonIcon
                  size="rounded"
                  shape="circle"
                  variant="text"
                  icon={<User />}
                />
              </Dropdown.Trigger>
              <Dropdown.List position="right">
                <Dropdown.Item onClick={() => navigate("/profile")}>
                  <HiOutlineUser
                    style={{
                      fontSize: "1.2rem",

                      cursor: "pointer",
                    }}
                  />
                  view profile
                </Dropdown.Item>
                <Dropdown.Item>
                  <BiMoon
                    style={{
                      fontSize: "1.4rem",

                      cursor: "pointer",
                    }}
                  />
                  <ItemWrapper>
                    <span>Dark Mode</span>
                    <ToggleWrapper onClick={toggleMode} isDark={isDarkMode}>
                      <Circle isDark={isDarkMode} />
                    </ToggleWrapper>
                  </ItemWrapper>
                </Dropdown.Item>
                <Dropdown.Item>
                  <FiSettings
                    style={{
                      fontSize: "1.2rem",

                      cursor: "pointer",
                    }}
                  />
                  settings
                </Dropdown.Item>
                <Dropdown.Item onClick={logOut}>
                  <BiSolidDoorOpen
                    style={{
                      fontSize: "1.4rem",

                      cursor: "pointer",
                    }}
                  />{" "}
                  Log out
                </Dropdown.Item>
              </Dropdown.List>
            </Dropdown>
          </>
        )}
      </Grouped>
    </StyledNavbar>
  );
}
const ToggleWrapper = styled.div`
  position: relative;
  width: 50px;
  height: 26px;
  background-color: ${({ isDark }) => (isDark ? "#027fd2" : "#d7dadc")};
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;
  transition: background-color 0.3s ease;
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Circle = styled.div`
  position: absolute;
  top: 3px;
  left: ${({ isDark }) => (isDark ? "26px" : "3px")};
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  transition: left 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default Navbar;
