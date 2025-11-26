import styled from "styled-components";
import PostCard from "../../features/Post/PostCard";
import TextFields from "../../components/TextFields";
import { useFieldText } from "../../hook/useFieldText";

function buildCommentTree(comments, parentId = null, level = 0) {
  return comments
    .filter((comment) => comment.parentId === parentId)
    .map((comment) => ({
      ...comment,
      commentLvl: level,
      repliesCount: comments.filter((c) => c.parentId === comment.id).length,
      replies: buildCommentTree(comments, comment.id, level + 1),
    }));
}

function CommentList({ comments }) {
  const tree = buildCommentTree(comments);
  const commentsWithLvl = tree;
  console.log(tree);

  return (
    <CommentsContainer>
      {commentsWithLvl.map((comment) => (
        <CommentItem comment={comment} key={comment.id} />
      ))}
    </CommentsContainer>
  );
}

function CommentItem({ comment }) {
  const { toggleTextField } = useFieldText();
  return (
    <CommentWrapper $commentLvl={comment.commentLvl}>
      <PostCard
        postData={comment}
        variant="comment"
        avatarSize="small"
        onClickComment={() => toggleTextField(comment.id)}
      >
        {comment.repliesCount > 0 && (
          <CommentRootLevel0 $repliesCount={comment.repliesCount} />
        )}
      </PostCard>

      {comment.replies.map((comment) => (
        <CommentItem comment={comment} key={comment.id} />
      ))}

      {comment.commentLvl > 0 && <CommentRootNested />}
    </CommentWrapper>
  );
}

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: left;
`;

export const CommentRootLevel0 = styled.span`
  position: absolute;
  display: block;
  left: 1rem;
  top: 2rem;
  bottom: 0rem;
  border-right: 1.5px solid var(--tertiary-color);
  border-radius: 25px;
`;

export const CommentRootNested = styled.span`
  position: absolute;
  display: block;
  left: 0rem;
  top: 2rem;

  border-right: 1.5px solid rgba(0, 0, 0, 0.1);
  border-radius: 25px;

  &::after {
    content: "";
    position: absolute;
    bottom: 15px;
    left: -8px;
    width: 8px;
    height: 2px;
    border-radius: 25px;
    background-color: var(--tertiary-color);
  }
`;

const CommentWrapper = styled.div`
  padding-right: 1rem;
  position: relative;

  display: flex;
  flex-direction: column;

  align-items: start;
  border-radius: 25px;

  transition: background-color 0.15s;
  cursor: pointer;
  gap: 0.5rem;
  margin-left: ${({ $commentLvl }) => ($commentLvl > 0 ? "1.5" : "0")}rem;

  width: 100%;
`;

export default CommentList;
