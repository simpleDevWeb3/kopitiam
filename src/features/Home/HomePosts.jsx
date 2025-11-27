// HomePosts.jsx

import styled from "styled-components";
import forumData from "../../data/post";
import PostList from "../Post/PostList";
import { usePostNavigation } from "../Post/usePostNavigation";
import useSidebar from "../../hook/useSidebar";
import { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { useFetchPosts } from "../Post/useFetchPosts";
import Spinner from "../../components/Spinner";

// Store scroll positions by path
const scrollPositions = {};

function HomePosts() {
  const { handleClickPost, handleClickProfile } = usePostNavigation();
  const { $isSidebarOpen } = useSidebar();
  const location = useLocation();
  const navType = useNavigationType();
  const containerRef = useRef(null);
  const { posts, isLoadPost, errorPost } = useFetchPosts();
  // Fetch data
  /*const { posts, comments } = forumData;

  // Join posts with comments (memoize if large)
  const postData = posts.map((post) => ({
    ...post,
    postComments: comments.filter((c) => c.postId === post.id),
  }));*/

  // Save scroll when leaving page
  useLayoutEffect(() => {
    return () => {
      if (containerRef.current) {
        scrollPositions[location.pathname] = containerRef.current.scrollTop;
      }
    };
  }, [location.pathname]);

  // Restore scroll when coming back
  useLayoutEffect(() => {
    if (containerRef.current) {
      const y = scrollPositions[location.pathname] || 0;
      containerRef.current.scrollTo(0, y);
    }
  }, [location.pathname]);

  return (
    <StyledContainer
      ref={containerRef}
      $isSidebarOpen={$isSidebarOpen}
      $navType={navType}
    >
      {isLoadPost && <Spinner />}
      {errorPost && <p>Error loading posts!</p>}
      {posts && (
        <PostWrapper>
          <PostList
            postData={posts}
            onClickPost={handleClickPost}
            onClickProfile={handleClickProfile}
          />
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
    transition: ${({ $navType }) =>
      $navType === "POP" ? "none" : "all 0.3s ease"};
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
