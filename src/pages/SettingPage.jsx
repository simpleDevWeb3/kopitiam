import styled from "styled-components";
import useSidebar from "../hook/useSidebar";
import Tabs from "../components/Tabs";
import { Outlet } from "react-router-dom";
import Modal from "../components/Modal";
import EditAccount from "../features/Auth/EditAccount";
import EditProfile from "../features/Auth/EditProfile";
import { useScrollRestore } from "../hook/useScrollRestore";

function SettingPage() {
  useScrollRestore();
  const { $isSidebarOpen } = useSidebar();
  const tabs = [
    {
      key: "ACCOUNT",
      label: "Account",
      index: true,
    },
    {
      key: "PROFILE",
      label: "Profile",
    },
  ];
  return (
    <StyledPage $isSidebarOpen={$isSidebarOpen}>
      <h1>Settings</h1>
      <br />
      <Tabs basePath={"/Settings"} links={tabs} />

      <Modal id={"Setting_Account"}>
        <EditAccount />
      </Modal>

      <Modal id={"Setting_Profile"}>
        <EditProfile />
      </Modal>
      <Outlet />
    </StyledPage>
  );
}

const StyledPage = styled.div`
  height: 100vh;
  padding-left: 4rem;
  & * {
    color: var(--text-color);
  }

  transform: ${({ $isSidebarOpen }) =>
    $isSidebarOpen ? "translateX(17rem)" : "translate(10rem)"};
  transition: transform 0.2s ease;
  @media (max-width: 800px) {
    transform: none;
    padding-top: 4rem;
    padding-left: 2rem;
  }
`;

export default SettingPage;
