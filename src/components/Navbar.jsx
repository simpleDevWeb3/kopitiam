import styled from "styled-components";
import Logo from "./Logo";
import {
  HiArrowLeft,
  HiOutlineBell,
  HiOutlinePlusCircle,
  HiOutlineUser,
  HiOutlineUserCircle,
} from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";
import Search from "./Search";
import { useNavigate, useSearchParams } from "react-router-dom";
import Hamburger from "./Hamburger";
import { useModal } from "../context/ModalContext";
import { useAuth } from "../features/Auth/AuthContext";
import { Dropdown } from "./Dropdown";
import {
  BiMoon,
  BiSearch,
  BiSolidDoorOpen,
  BiSun,
  BiUser,
  BiUserCircle,
} from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { useDarkTheme } from "../context/DarkThemeContext";
import { useState, useEffect } from "react";
import { GrDashboard } from "react-icons/gr";
import { BsDash } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import useSidebar from "../hook/useSidebar";
import { useDashboard } from "../hook/useDashboard";
import { IoExitOutline } from "react-icons/io5";
import { useLogout } from "../features/Auth/useLogout";

const StyledNavbar = styled.nav`
  position: fixed;
  display: flex;
  width: 100%;
  border-bottom: 2px solid var(--tertiary-color);
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 1rem 1rem;
  gap: 0.7rem;
  background-color: var(--background-color);
  max-height: 3.5rem;
  z-index: 99;
  transition: background-color 0.15s ease-in;

  @media (max-width: 800px) {
    justify-content: center;
    justify-content: ${({ $isDashboard }) => $isDashboard && "space-between"};
  }
`;

const IconText = styled.span`
  @media (max-width: 468px) {
    display: none;
  }
`;

const CreatePostIcon = styled(HiOutlinePlusCircle)`
  color: var(--primary-color);
  font-size: 1.5rem;
`;

const Notification = styled(HiOutlineBell)`
  color: var(--primary-color);
  font-size: 1.5rem;
`;

const Grouped = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

const User = styled(HiOutlineUserCircle)`
  color: var(--primary-color);
  font-size: 1.7rem;
`;

const SearchContainer = styled.div`
  display: flex;
  max-width: 30rem;
  width: 100%;
  @media (max-width: 800px) {
    justify-content: end;
  }
`;

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
`;

function Navbar() {
  const { isDashboardRoute } = useDashboard();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const { toggleModal } = useModal();
  const { isAuthenticated, user } = useAuth();
  const { isDarkMode, toggleMode } = useDarkTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileSearch, setMobileSearch] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 800);
  console.log("isAuth: ", isAuthenticated);
  function handleSearch(query) {
    setSearchParams({ q: query });
    navigate(`/search?q=${query}`);
  }
  console.log(user);
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 800);
      if (window.innerWidth >= 800) setMobileSearch(false); // reset search bar
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isDashboardRoute)
    return (
      <StyledNavbar $isDashboard={isDashboardRoute} style={{}}>
        <Grouped>
          <Hamburger />
        </Grouped>
        <Grouped>
          <ButtonIcon
            size="rounded"
            variant="text"
            action={toggleMode}
            icon={isDarkMode ? <BiSun /> : <BiMoon />}
          />
          <ButtonIcon
            variant="text"
            size="rounded"
            action={() => navigate("/")}
            icon={<BiUser />}
          />
          <ButtonIcon
            variant="text"
            size="rounded"
            action={() => navigate("/")}
            icon={<IoExitOutline />}
          />
        </Grouped>
      </StyledNavbar>
    );
  return (
    <StyledNavbar>
      {!mobileSearch ? (
        <Grouped>
          <Hamburger />
          <Logo />
        </Grouped>
      ) : (
        <Grouped>
          <HiArrowLeft
            onClick={() => setMobileSearch(false)}
            style={{ color: "var(--primary-color)", fontSize: "1.5rem" }}
          />
        </Grouped>
      )}

      <SearchContainer>
        {isDesktop ? (
          <Dropdown position="center">
            <Search onSearch={handleSearch} />
          </Dropdown>
        ) : !mobileSearch ? (
          <BiSearch
            onClick={() => setMobileSearch(true)}
            style={{
              color: "var(--primary-color)",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
          />
        ) : (
          <Dropdown position="center">
            <Search onSearch={handleSearch} />
          </Dropdown>
        )}
      </SearchContainer>

      {!mobileSearch && (
        <Grouped>
          {!isAuthenticated ? (
            <ButtonIcon action={() => toggleModal("Login")}>
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
                      style={{ fontSize: "1.2rem", cursor: "pointer" }}
                    />
                    view profile
                  </Dropdown.Item>

                  <Dropdown.Item onClose={false}>
                    <BiMoon style={{ fontSize: "1.4rem", cursor: "pointer" }} />
                    <ItemWrapper>
                      <span>Dark Mode</span>
                      <ToggleWrapper onClick={toggleMode} isDark={isDarkMode}>
                        <Circle isDark={isDarkMode} />
                      </ToggleWrapper>
                    </ItemWrapper>
                  </Dropdown.Item>

                  <Dropdown.Item onClick={() => navigate("/Settings")}>
                    <FiSettings
                      style={{ fontSize: "1.2rem", cursor: "pointer" }}
                    />
                    settings
                  </Dropdown.Item>

                  <Dropdown.Item onClick={() => logout()}>
                    <BiSolidDoorOpen
                      style={{ fontSize: "1.4rem", cursor: "pointer" }}
                    />
                    Log out
                  </Dropdown.Item>

                  <Dropdown.Item onClick={() => navigate("/dashboard")}>
                    <MdDashboard
                      style={{ fontSize: "1.4rem", cursor: "pointer" }}
                    />
                    Dashboard
                  </Dropdown.Item>
                </Dropdown.List>
              </Dropdown>
            </>
          )}
        </Grouped>
      )}
    </StyledNavbar>
  );
}

export default Navbar;
