//SubComponent

import PostMenusOther from "./PostMenusOther";
import PostContent from "./PostContent";
import PostProfile from "./PostProfile";
import PostSocialFeatures from "./PostSocialFeatures";

//css
import { variantSize } from "../../styles/VariantSize";
import styled from "styled-components";
import PostContext, { usePost } from "./PostContext";
import { usePostNavigation } from "./usePostNavigation";
import Avatar from "../../components/Avatar";
import TextFields from "../../components/TextFields";
import { useFieldText } from "../../hook/useFieldText";
import { HiChatAlt, HiDotsCircleHorizontal } from "react-icons/hi";
import {
  HiMiniCircleStack,
  HiMiniInformationCircle,
  HiMiniQuestionMarkCircle,
  HiPencil,
} from "react-icons/hi2";
import { VscTriangleLeft } from "react-icons/vsc";
import { GoTriangleLeft } from "react-icons/go";
import VoteBtn from "../../components/VoteBtn";
import CommentBtn from "../../components/CommentBtn";
import ButtonIcon from "../../components/ButtonIcon";
import { useModal } from "../../context/ModalContext";
import { useAuth } from "../Auth/AuthContext";
import { useUser } from "../Auth/useUser";
import { useCreateComment } from "../Comment/useCreateComment";
import { useFetchPostComment } from "./useFetchPostComment";
import { useParams } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import { MdOutlineArrowRight } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import { formatTimeAgo } from "../../helpers/dateHelper";
import { LuDot } from "react-icons/lu";
import { useCallback } from "react";
import { truncateText } from "../../helpers/stringHelper";

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
        {variant === "comment" && (
          <CommentPost children={children} postData={postData} />
        )}
        {variant === "userCommented" && <UserCommented />}
        {variant === "post" && (
          <PostBody>
            <PostHeader>
              <div
                style={{
                  display: "flex",
                  alignItems: postData.community_id ? "start" : "center",
                }}
              >
                <PostProfile />
                <span
                  style={{
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <LuDot />
                  <span style={{ fontSize: "0.8rem" }}>
                    {formatTimeAgo(postData.created_at)}
                  </span>
                </span>
              </div>
              <PostMenusOther />
            </PostHeader>
            <Tag>{postData.topic_name}</Tag>

            <PostContent />
            <PostSocialFeatures />
          </PostBody>
        )}
        {variant === "user_post" && <User_Post data={postData} />}
      </StyledPost>
    </PostContext.Provider>
  );
}
function CommentPost({ children, postData }) {
  const { isShowTextField } = useFieldText();

  const { user, isAuthenticated } = useUser();
  const { createComment } = useCreateComment();
  const { postId } = useParams();
  const id = postId;
  const { postComment, isLoadComment } = useFetchPostComment(postId, user?.id);
  const { user_id: op_id } = isLoadComment ? null : postComment[0];

  const isOP = function (user_id) {
    return op_id === user_id;
  };

  return (
    <>
      <AvatarContainer>
        <Avatar src={postData.avatar_url} />
        {children}
      </AvatarContainer>
      <PostBody>
        <PostHeader>
          <UserName style={{ gap: "0.5rem" }}>
            {isOP(postData.user_id) && (
              <label
                style={{
                  background: "var(--hover-color)",
                  color: "var(--text-color)",
                  padding: "0.2rem 1rem",
                  borderRadius: "25px",
                  marginRight: "0.5rem",
                }}
              >
                OP
              </label>
            )}
            {postData.user_name}
            <span
              style={{
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
              }}
            >
              <LuDot /> {formatTimeAgo(postData.created_at)}
            </span>
          </UserName>
        </PostHeader>
        {postData?.reply_to_username && (
          <p
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "0.8rem",
              marginBottom: "0.5rem",
              background: "var(--hover-color)",
              width: "fit-content",
              padding: "0.5rem 1rem",
              borderRadius: "25px",
            }}
          >
            <>
              <span style={{ fontWeight: "700" }}>
                replies to{" "}
                {isOP(postData.reply_to_id) && (
                  <label
                    style={{
                      background: "var(--hover-color)",
                      color: "var(--text-color)",
                      padding: "0.2rem 1rem",
                      borderRadius: "25px",
                      marginRight: "0.5rem",
                    }}
                  >
                    OP
                  </label>
                )}
                {postData.reply_to_username}
              </span>
              <span
                style={{
                  fontWeight: "500",
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                }}
              >
                : {truncateText(postData.reply_to_content)}
              </span>
            </>
          </p>
        )}

        <PostContent />
        <PostSocialFeatures post_id={id} />

        {isAuthenticated && isShowTextField === postData.comment_id && (
          <TextFields
            onSubmit={(content) =>
              createComment({
                postId: id,
                userId: user.id,
                parentId: postData.comment_id,
                content,
              })
            }
          />
        )}
      </PostBody>
    </>
  );
}

function UserCommented() {
  const { user } = useUser();
  return (
    <>
      <AvatarContainer>
        <Avatar src="/avatar.jpg" />
      </AvatarContainer>
      <PostBody>
        <PostHeader>
          <div
            style={{ display: "flex", gap: "1rem", alignItems: "self-start" }}
          >
            <UserName>@c/MalaysiaKini</UserName>

            <span
              style={{
                fontSize: "0.8rem",
                display: "flex",
                gap: "0.5rem",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <GoTriangleLeft /> Who know how to make coffe.
            </span>
          </div>
        </PostHeader>
        <p style={{ fontSize: "0.8rem" }}>
          <b> {user.name} </b>replied to <b> u/Elex</b>
        </p>
        <br />
        <PostContent />
        <PostSocialFeatures />
      </PostBody>
    </>
  );
}

function User_Post({ data }) {
  const { openModal } = useModal();

  return (
    <PostBody>
      <PostHeader>
        <PostProfile />
      </PostHeader>
      <PostContent />
      <StyledAction>
        <VoteBtn />
        <CommentBtn />
        <ButtonIcon size="rounded" action={() => openModal("Edit Post", data)}>
          <HiPencil />
        </ButtonIcon>
      </StyledAction>
    </PostBody>
  );
}
const StyledAction = styled.div`
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
`;
const UserName = styled.div`
  color: var(--primary-color);
  font-weight: 700;
  font-size: 0.7rem;
  margin-bottom: 0.5rem;
  text-align: center;
  display: flex;
  align-items: center;
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
  position: relative;
`;

const Tag = styled.span`
  background-color: rgb(25, 148, 255);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  margin-bottom: 1rem;
  display: inline-block;
  color: white;
  font-weight: 600;
`;
export default PostCard;
