import styled from "styled-components";
import Spinner from "../../components/Spinner";
import forumData from "../../data/post";
import { useUser } from "../Auth/useUser";
import PostCard from "../Post/PostCard";
import PostList from "../Post/PostList";
import { useFetchCurrUserPost } from "../Post/useFetchCurrUserPost";

function PostsTab() {
  const { user } = useUser();
  const { posts, isLoadPost, errorPost } = useFetchCurrUserPost(user.id);

  return (
    <div style={{ position: "relative" }}>
      {isLoadPost && <Spinner />}
      {errorPost && <div>{errorPost}</div>}

      {posts &&
        posts.map((post) => (
          <PostWrapper>
            <PostCard postData={post} variant="user_post" />
            <br />
          </PostWrapper>
        ))}
    </div>
  );
}
const PostWrapper = styled.div`
  border-bottom: solid 1px var(--hover-color);
  margin-bottom: 1rem;
`;
export default PostsTab;
