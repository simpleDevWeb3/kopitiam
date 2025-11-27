import styled from "styled-components";
import PostForm from "../features/Post/PostForm";
import useSidebar from "../hook/useSidebar";
import { useScrollRestore } from "../hook/useScrollRestore";
import RegisterPreference from "../features/Auth/RegisterPreference";
import Modal from "../components/Modal";
import { Selector } from "../components/Selector";
import SelectTopic from "../components/SelectTopic";

function CreatePostPage() {
  const { $isSidebarOpen } = useSidebar();
  useScrollRestore();
  return (
    <PageContainer $isSidebarOpen={$isSidebarOpen}>
     
      <PostForm />
    </PageContainer>
  );
}

export default CreatePostPage;
const PageContainer = styled.div`
  height: 100vh;
  max-width: 80%;
  transform: ${({ $isSidebarOpen }) =>
    $isSidebarOpen ? "translateX(6rem)" : "translateX(3rem)"};
  transition: transform 0.3s ease-in-out;
  @media (max-width: 1000px) {
    padding-top: 3rem;
    max-width: 100%;
    transform: translateX(0rem);
  }
`;
