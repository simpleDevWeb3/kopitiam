import { Outlet } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import Navbar from "./components/Navbar";

import useSidebar from "./hook/useSidebar";
import Menus from "./components/Menus";
import { SidebarProvider } from "./context/SidebarContext";
import Modal from "./components/Modal";
import LoginForm from "./features/Auth/LoginForm";
import CommunityForm from "./features/Community/CommunityForm";
import { Selector } from "./components/Selector";
import AuthForm from "./features/Auth/AuthForm";
import EditForm from "./features/Post/EditForm";
import { AuthProvider } from "./features/Auth/AuthContext";
import { Toaster } from "react-hot-toast";

//import { Menus } from "./components/Menus";

const StyledApp = styled.div`
  display: grid;
  grid-template-rows: auto 1fr; /* Header 20%, rest 80% */
  height: 100%;
  background-color: var(--background-color);
  transition: background-color 0.15s ease-in;

  & * {
    color: var(--text-color);
  }
`;

const Layout = styled.div`
  display: grid;
  position: relative;
  height: 100%;

  @media (max-width: 1300px) {
    grid-template-columns: 1fr;
  }
`;

const OverlayDiv = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  position: absolute;

  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 70;

  @media (min-width: 1300px) {
    display: none; /* hide overlay on desktop/large screens */
  }
`;

const Content = styled.main`
  padding: 1rem;
  padding-top: 4rem;
  padding-bottom: 0px;

  height: 100%;
  width: 100%;

  @media (max-width: 800px) {
    padding: 0rem;
  }
`;

function App() {
  const { isSidebarOpen } = useSidebar();

  return (
    <AuthProvider>
      <StyledApp>
        <Navbar />

        <Layout>
          <Sidebar />

          <OverlayDiv $isOpen={isSidebarOpen} />

          <Modal id={"Login"}>
            <AuthForm />
          </Modal>

          <Selector>
            <Modal id={"Create Community"}>
              <CommunityForm />
            </Modal>
          </Selector>
          <Modal id={"Edit Post"}>
            <EditForm />
          </Modal>
          <Menus>
            <Content>
              <Outlet />
            </Content>
          </Menus>
        </Layout>
      </StyledApp>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--background-color)",
            color: "var(--text-color)",
            boxShadow: "1px 5px 5px var(--hover-color)",
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
