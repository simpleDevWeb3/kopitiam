import styled from "styled-components";
import PostForm from "../features/Post/PostForm";
import useSidebar from "../hook/useSidebar";
import { useScrollRestore } from "../hook/useScrollRestore";
import RegisterPreference from "../features/Auth/RegisterPreference";
import Modal from "../components/Modal";
import { Selector } from "../components/Selector";
import SelectTopic from "../components/SelectTopic";
import { useUser } from "../features/Auth/useUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function CreatePostPage() {
  const { user } = useUser();
  const { $isSidebarOpen } = useSidebar();
  useScrollRestore();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.is_banned) {
      toast.error("User has been banned by the admin.");
      navigate("/", { replace: true }); // 'replace' prevents going back to this page
    }
  }, [user, navigate]);

  if (user?.is_banned) return null;
  return (
    <PageContainer $isSidebarOpen={$isSidebarOpen}>
      <PostForm />
    </PageContainer>
  );
}

export default CreatePostPage;
const PageContainer = styled.div`
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
