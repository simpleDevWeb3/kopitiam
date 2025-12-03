// HomePosts.jsx

import styled from "styled-components";

import PostList from "../Post/PostList";
import { usePostNavigation } from "../Post/usePostNavigation";
import useSidebar from "../../hook/useSidebar";
import { useEffect } from "react";
import { useNavigationType } from "react-router-dom";
import { useFetchPosts } from "../Post/useFetchPosts";
import Spinner from "../../components/Spinner";
import { useInView } from "react-intersection-observer";
import SpinnerMini from "../../components/SpinnerMini";
import { Mosaic } from "react-loading-indicators";
import { useUser } from "../Auth/useUser";

// Store scroll positions by path

function HomePosts() {
  const { handleClickPost, handleClickProfile } = usePostNavigation();
  const { $isSidebarOpen } = useSidebar();

  const navType = useNavigationType();
  // Fetch data
  /*const { posts, comments } = forumData;

  // Join posts with comments (memoize if large)
  const postData = posts.map((post) => ({
    ...post,
    postComments: comments.filter((c) => c.postId === post.id),
  }));*/
  const { user } = useUser();
  const {
    posts,
    isLoadPost,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    errorPost,
  } = useFetchPosts(user?.id);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log("hasNextPage?: " + hasNextPage);
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (isLoadPost) return <Spinner />;

  return (
    <StyledContainer $isSidebarOpen={$isSidebarOpen} $navType={navType}>
      {isLoadPost && <Spinner />}
      {errorPost && <p>Error loading posts!</p>}
      {posts && (
        <PostWrapper>
          <PostList
            postData={posts}
            onClickPost={handleClickPost}
            onClickProfile={handleClickProfile}
          />
          <div
            ref={ref}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "10rem",
              width: "100%",
            }}
          >
            {isFetchingNextPage && (
              <Mosaic
                color="rgba(21, 144, 221, 0.889)"
                size="large"
                text=""
                textColor=""
              />
            )}
          </div>
        </PostWrapper>
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  width: 70%; /* fill viewport to prevent body background flash */
  min-height: 100vh; /* full height */
  justify-content: center;
  align-items: start;
  box-sizing: border-box;
  overflow-y: visible;

  @media (min-width: 1000px) {
    transform: ${({ $isSidebarOpen }) =>
      $isSidebarOpen ? "translateX(13rem)" : "translateX(5rem)"};
    transition: transform 0.3s ease-in;
  }

  @media (max-width: 1300px) {
    justify-content: left;
  }

  @media (max-width: 800px) {
    width: 100%;
    padding-top: 3rem;
  }
`;

const PostWrapper = styled.div`
  width: 100%;
  max-width: 45rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  border-radius: 25px;
  cursor: pointer;
  gap: 0.2rem;

  @media (max-width: 1300px) {
    max-width: 100%;
  }
`;

export default HomePosts;
