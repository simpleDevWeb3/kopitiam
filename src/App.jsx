import { Outlet } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import Navbar from "./components/Navbar";

const StyledApp = styled.div`
  display: grid;
  grid-template-rows: 8% 92%; /* Header 20%, rest 80% */
  height: 100vh;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  height: 100%;
`;

const Content = styled.main`
  padding: 1rem;
  overflow-y: auto;
`;

function App() {
  return (
    <StyledApp>
      <Navbar />
      <Layout>
        <Sidebar />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </StyledApp>
  );
}

export default App;
