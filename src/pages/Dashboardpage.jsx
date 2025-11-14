import { Outlet } from "react-router-dom";
import styled from "styled-components";
import useSidebar from "../hook/useSidebar";
import { useScrollRestore } from "../hook/useScrollRestore";

function Dashboardpage() {
  const { isSidebarOpen } = useSidebar();
  useScrollRestore();
  return (
    <PageContainer $isSidebarOpen={isSidebarOpen}>
      <Outlet />
    </PageContainer>
  );
}

export default Dashboardpage;
const PageContainer = styled.div`

  transform: ${({ $isSidebarOpen }) =>
    $isSidebarOpen ? "translateX(17rem)" : "translateX(0rem)"};
  transition: transform 0.4s ease;
  @media (max-width: 800px) {
    padding-top: 4rem;
    transform: none;
  }
`;
