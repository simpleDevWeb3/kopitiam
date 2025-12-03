import styled from "styled-components";
import PostCard from "../../features/Post/PostCard";
import TextFields from "../../components/TextFields";
import { useFieldText } from "../../hook/useFieldText";
import { useState } from "react";
import ButtonIcon from "../../components/ButtonIcon";

// --- Logic Helpers (Unchanged) ---
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
/*
const flattenComments = (nestedComments) => {
  return nestedComments.reduce((acc, currentComment) => {
    acc.push(currentComment);
    if (currentComment.sub_comment && currentComment.sub_comment.length > 0) {
      const flattenedChildren = flattenComments(currentComment.sub_comment);
      acc.push(...flattenedChildren);
    }
    return acc;
  }, []);
};*/

// --- Main List Component ---
function CommentList({ comments }) {
  //const flatComment = flattenComments(comments);
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

  // YouTube style: Replies usually hidden by default. Set to true if you want them open.
  const [isExpanded, setIsExpanded] = useState(true);

  const hasReplies = comment?.replies && comment.replies.length > 0;

  return (
    <CommentWrapper>
      {/* 1. Parent Comment */}
      <PostCard
        postData={comment}
        variant="comment"
        avatarSize="small"
        onClickComment={() => toggleTextField(comment?.comment_id)}
      />

      {/* 2. YouTube Style Toggle Button */}
      {/* Positioned between Parent and Replies, aligned with text */}
      {hasReplies && (
        <ToggleContainer>
          {/* This empty spacer aligns the button with the text, not the avatar */}
          <IndentSpacer />
          <ButtonIcon
            variant="text"
            style={{ fontSize: "0.8rem" }}
            action={() => setIsExpanded(!isExpanded)}
          >
            {/* Simple Chevron Arrow */}
            <span
              style={{
                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                display: "inline-block",
                transition: "0.2s",
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

      {/* 3. Nested Replies */}
      {hasReplies && isExpanded && (
        <RepliesRow>
          {/* A. Indent Spacer (Invisible, just keeps the structure) */}
          <IndentSpacer />

          {/* B. Children */}
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

// --- Styled Components (YouTube Style) ---

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
  margin-bottom: 0.5rem; /* Gap between comments */
`;

const RepliesRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

// RENAMED: This used to be ThreadLineContainer.
// Now it is just a spacer to keep your indentation.
const IndentSpacer = styled.div`
  width: 40px; /* Matches Avatar Width + Margin */
  flex-shrink: 0;
  /* No borders, no colors. Just empty space. */
`;

const ChildrenColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// --- New Toggle Button Styles ---

const ToggleContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 8px; /* Space between button and replies */
`;
