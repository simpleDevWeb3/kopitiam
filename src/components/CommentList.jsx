import styled from "styled-components";
import PostCard from "./PostCard";

const CommentWrapper = styled.div`
  width: 100%;
  max-width: 700px; /* Match post width */
  display: flex;
  flex-direction: column;
  align-items: start;
  border-radius: 25px;
  padding: 1rem 1rem 0rem 1rem;
  &:hover {
    background-color: rgba(160, 158, 158, 0.05);
  }
  transition: background-color 0.15s;
  cursor: pointer;
  gap: 0.5rem;

  @media (max-width: 1300px) {
    max-width: 100%;
  }
`;

function CommentList({ comments, onClickVote, onClickComment, onClickShare }) {
  return (
    <>
      {comments.map((comment) => (
        <CommentWrapper key={comment.id}>
          <PostCard
            postData={comment}
            variant="comment"
            avatarSize="small"
            onClickVote={(voteType) => onClickVote?.(comment.id, voteType)}
            onClickComment={() => onClickComment?.(comment.id)}
            onClickShare={() => onClickShare?.(comment.id)}
          />
        </CommentWrapper>
      ))}
    </>
  );
}

export default CommentList;
