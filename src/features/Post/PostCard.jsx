//SubComponent

import PostMenusOther from "./PostMenusOther";
import PostContent from "./PostContent";
import PostProfile from "./PostProfile";
import PostSocialFeatures from "./PostSocialFeatures";

//css
import { variantSize } from "../../styles/VariantSize";
import styled from "styled-components";
import PostContext from "./PostContext";
import { usePostNavigation } from "./usePostNavigation";
import Avatar from "../../components/Avatar";
import TextFields from "../../components/TextFields";
import { useFieldText } from "../../hook/useFieldText";

function PostCard({
  postData,
  variant = "post",
  avatarSize = "small",
  onClickComment,
  children,
}) {
  const { handleClickPost } = usePostNavigation();
  const contextValue = {
    postData,
    variant,
    avatarSize,
    onClickComment,
  };

  return (
    <PostContext.Provider value={contextValue}>
      <StyledPost
        onClick={(e) =>
          variant !== "post" ? "" : handleClickPost(e, postData.id)
        }
      >
        {variant === "comment" ? (
          <CommentPost children={children} postData={postData} />
        ) : (
          <PostBody>
            <PostHeader>
              <PostProfile />
              <PostMenusOther />
            </PostHeader>
            <PostContent />
            <PostSocialFeatures />
          </PostBody>
        )}
      </StyledPost>
    </PostContext.Provider>
  );
}
function CommentPost({ children, postData }) {
  const { isShowTextField } = useFieldText();

  return (
    <>
      <AvatarContainer>
        <Avatar src="/avatar.jpg" />
        {children}
      </AvatarContainer>
      <PostBody>
        <PostHeader>
          <UserName>@c/MalaysiaKini</UserName>
        </PostHeader>
        <PostContent />
        <PostSocialFeatures />

        {isShowTextField === postData.id && <TextFields />}
      </PostBody>
    </>
  );
}
const UserName = styled.div`
  color: var(--primary-color);
  font-weight: 700;
  font-size: 0.7rem;
  margin-bottom: 0.5rem;
`;

const AvatarContainer = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    transition: background-color 0.15s;
  }
`;
const StyledPost = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: ${({ $variant }) =>
    $variant === "comment" ? `columns` : " "};

  align-items: start;
  ${({ $variant }) => variantSize[$variant] || variantSize.post};
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PostBody = styled.div`
  flex: 1;
`;

export default PostCard;
