import styled from "styled-components";
import PostList from "../Post/PostList";
import forumData from "../../data/post";
import CommentList from "../Comment/CommentList";
import PostCard from "../Post/PostCard";

function CommentedTab() {
  const { comments } = forumData;
  const comment = comments.filter((comment) => comment.authorId == "u101");

  return (
    <StyledContainer>
      {comment.map((c) => (
        <PostWrapper key={comment.id}>
          <PostCard variant="userCommented" postData={c} />
        </PostWrapper>
      ))}
    </StyledContainer>
  );
}

export default CommentedTab;
const StyledContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const PostWrapper = styled.div`
  padding: 1rem;
  border-radius: 25px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border-bottom: solid 1px var(--hover-color);
`;
