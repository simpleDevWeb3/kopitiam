import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Mosaic } from "react-loading-indicators";
import PostList from "../Post/PostList";
import NoExist from "../../components/NoExist";
import Spinner from "../../components/Spinner";
import { useFetchComunityPost } from "./useFetchCommunityPost"; // Adjust import path
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";

function CommunityFeed() {
  const { communityId, userId } = useOutletContext();
  const {
    posts,
    isLoadCommunityPost,
    errorCommunityPost,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchComunityPost(communityId, userId);

  const { ref, inView } = useInView();
  const existPost = posts.length > 0;

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoadCommunityPost) return <Spinner />;
  if (errorCommunityPost) return <h1>{errorCommunityPost}</h1>;
  if (!existPost) return <NoExist name={"post"} />;
  return (
    <FeedContainer>
      {posts && <PostList postData={posts} />}

      {/* Infinite Scroll Trigger */}
      <div
        ref={ref}
        style={{
          display: "flex",
          justifyContent: "center",
          height: "10rem",
          width: "100%",
        }}
      >
        {isFetchingNextPage && (
          <Mosaic color="rgba(21, 144, 221, 0.889)" size="large" />
        )}
      </div>
    </FeedContainer>
  );
}

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

export default CommunityFeed;
