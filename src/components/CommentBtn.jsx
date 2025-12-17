import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiChatAlt2 } from "react-icons/hi";
import {
  HiOutlineChatBubbleLeft,
  HiOutlineChatBubbleOvalLeft,
} from "react-icons/hi2";
import { usePost } from "../features/Post/PostContext";
import { useModal } from "../context/ModalContext";
import { useAuth } from "../features/Auth/AuthContext";


const IComment = styled(HiOutlineChatBubbleOvalLeft)``;
const CountComment = styled.span``;

function CommentBtn({ onComment }) {
  const { postData, variant, onClickComment } = usePost();
  const { total_comment: commentCount } = postData;
  const { openModal } = useModal();
  const { isAuthenticated } = useAuth();
  return (
    <ButtonIcon
      data-allowpostclick
      action={() => {
        
        if (isAuthenticated) {
          onClickComment();
          onComment?.();
        } else {
          openModal("Login");
        }
      }}
      variant={
        variant === "comment" || variant === "userCommented" ? "text" : ""
      }
      size="small"
      hover="background"
      icon={<IComment />}
    >
      {variant === "comment" || variant === "userCommented" ? (
        <span>Reply</span>
      ) : (
        <CountComment>{commentCount}</CountComment>
      )}
    </ButtonIcon>
  );
}

export default CommentBtn;
