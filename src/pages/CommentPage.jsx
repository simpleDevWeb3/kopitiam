import { useParams } from "react-router-dom";
import styled from "styled-components";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import forumData from "../data/post";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 2rem 1rem;
  box-sizing: border-box;
  overflow-y: scroll;
  @media (max-width: 1300px) {
    justify-content: left;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 740px; /* Reddit post column width */
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SocialFeatures = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  margin-top: 0.6rem;
`;

function CommentPage() {
  const { postId } = useParams();
  const id = Number(postId);

  const post = forumData.posts.find((post) => post.id === id);
  if (!post) return <div>Post not found</div>;

  const comments = forumData.comments.filter(
    (comment) => comment.postId === post.id
  );

  return (
    <StyledContainer>
      <ContentWrapper>
        <Post post={post} comments={comments}>
          <Post.Avatar size="medium" />
          <Post.Title />
          <SocialFeatures>
            <Post.Vote />
            <Post.Comment />
            <Post.Share />
          </SocialFeatures>
          <CommentList comments={comments} />
        </Post>
      </ContentWrapper>
    </StyledContainer>
  );
}

export default CommentPage;
