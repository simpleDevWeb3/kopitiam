//Display recommended Post

import styled from "styled-components";
import forumData from "../../data/post";
import PostList from "../Post/PostList";
import { usePostNavigation } from "../Post/usePostNavigation";
import useSidebar from "../../hook/useSidebar";

function HomePosts() {
  const { handleClickPost, handleClickProfile } = usePostNavigation();
  const { isSidebarOpen } = useSidebar();
  //fetch data api example
  const { posts, comments } = forumData;
  console.log("🏠 HomePosts mounted");
  // join post and comment table
  const postData = posts.map((post) => {
    return {
      ...post,
      postComments: comments.filter((c) => c.postId === post.id),
    };
  });

  return (
    <StyledContainer isSidebarOpen={isSidebarOpen}>
      <PostWrapper>
        <PostList
          postData={postData}
          onClickPost={handleClickPost}
          onClickProfile={handleClickProfile}
        />
      </PostWrapper>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  width: 70%;

  justify-content: center;
  @media (min-width: 1000px) {
    transform: ${(props) =>
      props.isSidebarOpen ? "translateX(13rem)" : "translateX(5rem)"};
    transition: all 0.3s ease;
  }
  @media (max-width: 800px) {
    width: 100%;
    padding-top: 3rem;
  }

  box-sizing: border-box;
  overflow-y: visible;
  @media (max-width: 1300px) {
    justify-content: left;
  }
  align-items: start;
`;

const PostWrapper = styled.div`
  width: 100%;
  max-width: 45rem;

  display: flex;
  flex-direction: column;
  align-items: start;
  border-radius: 25px;
  justify-content: start;
  cursor: pointer;
  @media (max-width: 1300px) {
    max-width: 100%;
  }

  gap: 0.2rem;
`;

export default HomePosts;
