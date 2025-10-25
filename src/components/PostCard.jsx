import styled, { css } from "styled-components";
import { variantSize } from "../styles/VariantSize";
import Text from "./Text";
import VoteBtn from "./VoteBtn";
import CommentBtn from "./CommentBtn";
import ShareBtn from "./ShareBtn";
import Avatar from "./Avatar";
import { useState } from "react";
import TextFields from "./TextFields";

const ShareYourThougt = styled.div`
  border: solid 1px rgba(0, 0, 0, 0.1);
  border-radius: 25px;

  padding: 0.5rem;
  padding-left: 1rem;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  transition: background-color 0.15s;
`;

const StyledPost = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 1rem;
  ${({ $variant }) => variantSize[$variant] || variantSize.post}
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: ${({ $vertical }) => ($vertical ? "column" : "row")};
  align-items: ${({ $center }) => ($center ? "center" : "stretch")};
  ${({ $variant }) => variantSize[$variant] || ""}
`;

const avatarSizes = {
  small: css`
    width: 1.8rem;
    height: 1.8rem;
  `,
  medium: css`
    width: 2.2rem;
    height: 2.2rem;
  `,
  large: css`
    width: 5rem;
    height: 5rem;
  `,
};
const AvatarContainer = styled.div`
  ${({ $size }) => avatarSizes[$size] || avatarSizes.small};
  border-radius: 50%;
  overflow: hidden;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; /* vertical align */
  gap: 0.5rem; /* spacing between avatar and name */
  margin-bottom: 0.5rem;
`;
const usernameSizes = {
  small: "0.7rem",
  medium: "0.9rem",
  large: "1rem",
};

const UserName = styled.div`
  color: var(--primary-color);
  font-weight: 700;
  font-size: ${({ $size }) => usernameSizes[$size] || usernameSizes.medium};
`;
const CommentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const SocialFeatures = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;
// Main Post component
function PostCard({
  postData,
  showCommentField = false,
  variant = "post",
  avatarSize = "small",
  onClickPost,
  onClickComment,
  onClickVote,
  onClickShare,
}) {
  const { id, title, content, votes, postComments } = postData;
  const [isShowTextField, setIsShowTextField] = useState(false);

  function toggleCommentField(postId) {
    console.log("Comment clicked for post", postId);
    setIsShowTextField((show) => !show);
  }
  console.log(showCommentField);
  console.log(postData);
  return (
    <>
      <StyledPost $variant={variant} onClick={() => onClickPost?.()}>
        <ProfileContainer>
          <AvatarContainer $size={avatarSize}>
            <Avatar src="/avatar.jpg" />
          </AvatarContainer>
          <UserName $size={avatarSize}>@c/MalaysiaKini</UserName>
        </ProfileContainer>

        <TextWrapper $vertical={true} $variant={variant}>
          {title && <Text as="Title">{title}</Text>}
          <Text variant={variant}>{content}</Text>
        </TextWrapper>

        <SocialFeatures>
          <VoteBtn
            variant={variant}
            votes={votes}
            onVote={() => onClickVote?.()}
          />
          <CommentBtn
            variant={variant}
            commentCount={postComments?.length}
            onComment={() => {
              onClickComment?.();
              toggleCommentField(id);
            }}
          />
          <ShareBtn variant={variant} onShare={() => onClickShare?.()} />
        </SocialFeatures>
      </StyledPost>
      {showCommentField &&
        (isShowTextField ? (
          <TextFields />
        ) : (
          variant === "post" && (
            <ShareYourThougt onClick={toggleCommentField}>
              Share Your Thought
            </ShareYourThougt>
          )
        ))}
    </>
  );
}
export default PostCard;
