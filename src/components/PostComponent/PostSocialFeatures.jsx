import styled from "styled-components";
import PostMenusShare from "./PostMenusShare";
import VoteBtn from "../VoteBtn";
import CommentBtn from "../CommentBtn";

function PostSocialFeatures({
  variant,
  votes,
  onClickVote,
  onClickComment,
  onClickShare,
  id,
  postComments,
}) {
  return (
    <SocialFeatures>
      <VoteBtn variant={variant} votes={votes} onVote={() => onClickVote?.()} />
      <CommentBtn
        variant={variant}
        commentCount={postComments?.length}
        onComment={() => {
          onClickComment?.();
        }}
      />

      <PostMenusShare variant={variant} onClickShare={onClickShare} id={id} />
    </SocialFeatures>
  );
}

const SocialFeatures = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export default PostSocialFeatures;
