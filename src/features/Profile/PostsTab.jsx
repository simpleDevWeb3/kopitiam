import styled from "styled-components";
import Spinner from "../../components/Spinner";
import forumData from "../../data/post";
import { useUser } from "../Auth/useUser";
import PostCard from "../Post/PostCard";
import PostList from "../Post/PostList";
import { useFetchCurrUserPost } from "../Post/useFetchCurrUserPost";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Mosaic } from "react-loading-indicators";

function PostsTab() {
  const { user } = useUser();
  const {
    posts,
    isLoadPost,
    errorPost,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchCurrUserPost(user.id);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);
  if (isLoadPost) return <Spinner />;
  return (
    <Container style={{ position: "relative" }}>
      {isLoadPost && <Spinner />}
      {errorPost && <div>{errorPost}</div>}

      {posts &&
        posts.map((post) => (
          <PostWrapper>
            <PostCard postData={post} variant="user_post" />
            <br />
          </PostWrapper>
        ))}
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
    </Container>
  );
}
const PostWrapper = styled.div`
  border-bottom: solid 1px var(--hover-color);
  margin-bottom: 1rem;
`;

const Container = styled.div`
  max-width: 700px;
`;
export default PostsTab;
