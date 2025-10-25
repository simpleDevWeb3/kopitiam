import styled from "styled-components";
import Post from "./Post";

const StyledPosts = styled.div`
  width: 100%;
  min-height: 100%;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: center; /* center posts horizontally */
  padding: 1rem;
  @media (max-width: 1300px) {
    max-width: 100%;
    padding: 0;
  }
`;

const PostWrapper = styled.div`
  width: 100%;

  cursor: pointer;
  @media (max-width: 1300px) {
    max-width: 100%;
  }
`;

const SocialFeatures = styled.div`
  display: flex;
  margin-top: 0.6rem;
  gap: 0.7rem;
`;

function CommentList({ comments }) {
  console.log(comments);

  return (
    <StyledPosts>
      {comments.map((comment) => (
        <PostWrapper key={comment.id}>
          <Post post={comment} type={"comment"} variant="comment">
            <Post.Avatar />
            <Post.Title variant="body" />
            <SocialFeatures>
              <Post.Vote />
              <Post.Comment />
              <Post.Share />
            </SocialFeatures>
          </Post>
        </PostWrapper>
      ))}
    </StyledPosts>
  );
}

export default CommentList;
