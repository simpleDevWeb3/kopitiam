import styled from "styled-components";
import Post from "./Post";
import Avatar from "./Avatar";

const StyledPosts = styled.div`
  width: 100%;
  min-height: 100%;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: center; /* center posts horizontally */

  @media (max-width: 1300px) {
    max-width: 100%;
    padding: 0;
  }
`;

const PostWrapper = styled.div`
  width: 100%;
  max-width: 700px; /* limit width for each post */

  display: flex;
  flex-direction: column;
  align-items: start;
  border-radius: 25px;
  padding: 1rem 1rem 0rem 1rem;
  &:hover {
    background-color: rgba(160, 158, 158, 0.1);
  }
  transition: background-color 0.15s;

  cursor: pointer;
  @media (max-width: 1300px) {
    max-width: 100%;
  }

  gap: 0.5rem;
`;

const SocialFeatures = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;
const BreakLine = styled.hr`
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  margin-top: 1rem;
`;

function PostList({ posts, comments }) {
  return (
    <StyledPosts>
      {posts.map((post) => (
        <PostWrapper key={post.id}>
          <Post post={post} toComment={true} comments={comments}>
            <Post.Avatar size="small" />
            <Post.Title />
            <SocialFeatures>
              <Post.Vote />
              <Post.Comment />
              <Post.Share />
            </SocialFeatures>
            <BreakLine />
          </Post>
        </PostWrapper>
      ))}
    </StyledPosts>
  );
}

export default PostList;
