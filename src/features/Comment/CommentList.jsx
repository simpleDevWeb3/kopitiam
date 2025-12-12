import styled from "styled-components";
import PostCard from "../../features/Post/PostCard";
import TextFields from "../../components/TextFields";
import { useFieldText } from "../../hook/useFieldText";
import { useState } from "react";
import ButtonIcon from "../../components/ButtonIcon";

// --- Logic Helpers ---
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

// --- Main List Component ---
function CommentList({ comments }) {
  const treeComment = buildCommentTree(comments);

  return (
    <CommentsContainer>
      {treeComment.map((comment) => (
        <CommentItem comment={comment} key={comment.comment_id} />
      ))}
    </CommentsContainer>
  );
}

// --- Individual Item Component ---
function CommentItem({ comment }) {
  const { toggleTextField } = useFieldText();
  const [isExpanded, setIsExpanded] = useState(false); // Default close
  const hasReplies = comment?.replies && comment.replies.length > 0;

  return (
    <CommentWrapper $commentLvl={comment.commentLvl}>
      {/* 1. Comment Body (The Post and The Toggle Button) */}
      <CommentBody>
        <PostCard
          postData={comment}
          variant="comment"
          avatarSize="small"
          onClickComment={() => toggleTextField(comment?.comment_id)}
        />

        {/* 2. Toggle Button - No longer indented, sits on the left */}
        {hasReplies && (
          <ToggleContainer>
            <ButtonIcon
              variant="text"
              style={{ fontSize: "0.8rem" }}
              action={() => setIsExpanded(!isExpanded)}
            >
              <span
                style={{
                  transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                  display: "inline-block",
                  transition: "0.2s",
                  marginRight: "6px",
                }}
              >
                ▼
              </span>
              {isExpanded
                ? " Hide replies"
                : ` View ${comment.replies.length} replies`}
            </ButtonIcon>
          </ToggleContainer>
        )}
      </CommentBody>

      {/* 3. Nested Replies - No longer indented */}
      {hasReplies && isExpanded && (
        <RepliesRow $commentLvl={comment.commentLvl}>
          <ChildrenColumn>
            {comment.replies.map((reply) => (
              <CommentItem comment={reply} key={reply.comment_id} />
            ))}
          </ChildrenColumn>
        </RepliesRow>
      )}
    </CommentWrapper>
  );
}

export default CommentList;

// --- Styled Components ---

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;

  /* Only add background to the very root comment */
  background-color: ${({ $commentLvl }) =>
    $commentLvl === 0 ? "var(--background-glass)" : "transparent"};
  padding: ${({ $commentLvl }) => ($commentLvl === 0 ? "2rem" : "0")};
  padding-top: ${({ $commentLvl }) => ($commentLvl === 0 ? "2rem" : "0")};
  padding-bottom: ${({ $commentLvl }) => ($commentLvl === 0 ? "2rem" : "0")};
  border-radius: ${({ $commentLvl }) => ($commentLvl === 0 ? "25px" : "0")};
  margin-bottom: ${({ $commentLvl }) => ($commentLvl === 0 ? "0.5rem" : "0")};
  //mobile
  @media (max-width: 800px) {
    padding: 0;
    padding-top: 1rem;
  }
`;

const CommentBody = styled.div`
  /* Standard padding for the card content */
  padding: 0.5rem 1rem 0 1rem;
`;

const ToggleContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* REMOVED: padding-left: 3.5rem; */
  padding-left: 0;
  margin-bottom: 8px;
`;

const RepliesRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  /* REMOVED: padding-left: 3.5rem; */
  padding-left: ${({ $commentLvl }) => ($commentLvl === 0 ? "3rem" : "0")};
`;

const ChildrenColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
