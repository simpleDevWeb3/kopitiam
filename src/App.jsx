import { Outlet } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import Navbar from "./components/Navbar";

import useSidebar from "./hook/useSidebar";

const StyledApp = styled.div`
  display: grid;
  grid-template-rows: auto 1fr; /* Header 20%, rest 80% */
  height: 100vh;
`;

const Layout = styled.div`
  display: grid;
  position: relative;
  height: 100%;
  position: relative;
  grid-template-columns: ${({ $isSidebarOpen }) =>
    $isSidebarOpen ? "250px 1fr" : "1fr"};
`;

const OverlayDiv = styled.div`
  display: ${({ $isSidebarOpen }) => ($isSidebarOpen ? "block" : "none")};
  position: fixed;

  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 900;

  @media (min-width: 1300px) {
    display: none; /* hide overlay on desktop/large screens */
  }
`;

const Content = styled.main`
  padding: 1rem;
  overflow-y: auto;
`;

function App() {
  const { isSidebarOpen } = useSidebar();

  return (
    <StyledApp>
      <Navbar />
      <Layout $isSidebarOpen={isSidebarOpen}>
        <Sidebar />
        <OverlayDiv $isSidebarOpen={isSidebarOpen} />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </StyledApp>
  );
}

export default App;
