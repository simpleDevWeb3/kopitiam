import styled from "styled-components";
import NotificationLayout from "../features/Notification/NotificationLayout";
import useSidebar from "../hook/useSidebar";
import { useScrollRestore } from "../hook/useScrollRestore";

function NotificationPage() {
  const { isSidebarOpen } = useSidebar();
  useScrollRestore();
  return (
    <PageContainer isSidebarOpen={isSidebarOpen}>
      <NotificationLayout />
    </PageContainer>
  );
}

export default NotificationPage;
const PageContainer = styled.div`
  height: 100vh;
  max-width: 80%;
  transform: ${(props) =>
    props.isSidebarOpen ? "translateX(10rem)" : "translateX(5rem)"};
  transition: transform 0.3s ease-in-out;
`;
