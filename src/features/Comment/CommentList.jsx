import styled from "styled-components";
import PostCard from "../../features/Post/PostCard";
import TextFields from "../../components/TextFields";
import { useFieldText } from "../../hook/useFieldText";

function buildCommentTree(comments, parentId = null, level = 0) {
  return comments
    .filter((comment) => {
      if (parentId === null || parentId === undefined) {
        return !comment.parent_id;
      }
      return comment.parent_id === parentId;
    })
    .map((comment) => ({
      ...comment,
      commentLvl: level,

      replies: buildCommentTree(comments, comment.comment_id, level + 1),
    }));
}

const flattenComments = (nestedComments) => {
  return nestedComments.reduce((acc, currentComment) => {
    // Add the current comment to the flat list
    acc.push(currentComment);

    // If it has sub_comments, flatten them recursively and add them too
    if (currentComment.sub_comment && currentComment.sub_comment.length > 0) {
      const flattenedChildren = flattenComments(currentComment.sub_comment);
      acc.push(...flattenedChildren);
    }

    return acc;
  }, []);
};

function CommentList({ comments }) {
  const flatComment = flattenComments(comments);
  const treeComment = buildCommentTree(flatComment);

  console.log("flat: ", flatComment);
  console.log("tree:", treeComment);
  // initial comment lvl
  return (
    <CommentsContainer>
      {treeComment.map((comment) => (
        <CommentItem comment={comment} key={comment.comment_id} />
      ))}
    </CommentsContainer>
  );
}

function CommentItem({ comment }) {
  const { toggleTextField } = useFieldText();

  return (
    <CommentWrapper $commentLvl={comment?.commentLvl}>
      <PostCard
        postData={comment}
        variant="comment"
        avatarSize="small"
        onClickComment={() => toggleTextField(comment?.comment_id)}
      >
        {comment?.replies.length > 0 && (
          <CommentRootLevel0 $repliesCount={comment?.replies.length} />
        )}
      </PostCard>

      {comment?.replies.map((comment) => (
        <CommentItem comment={comment} key={comment?.id} />
      ))}

      {comment?.commentLvl > 0 && <CommentRootNested />}
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
