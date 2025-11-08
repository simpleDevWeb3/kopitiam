import styled from "styled-components";
import PostForm from "../features/Post/PostForm";
import useSidebar from "../hook/useSidebar";
import { useScrollRestore } from "../hook/useScrollRestore";

function CreatePostPage() {
  const { isSidebarOpen } = useSidebar();
  useScrollRestore();
  return (
    <PageContainer isSidebarOpen={isSidebarOpen}>
      <PostForm />
    </PageContainer>
  );
}

export default CreatePostPage;
const PageContainer = styled.div`
  height: 100vh;
  max-width: 80%;
  transform: ${(props) =>
    props.isSidebarOpen ? "translateX(6rem)" : "translateX(3rem)"};
  transition: transform 0.3s ease-in-out;
`;
