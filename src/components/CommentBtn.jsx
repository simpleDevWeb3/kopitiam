import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiChatAlt2 } from "react-icons/hi";
import {
  HiOutlineChatBubbleLeft,
  HiOutlineChatBubbleOvalLeft,
} from "react-icons/hi2";

const IComment = styled(HiOutlineChatBubbleOvalLeft)``;
const CountComment = styled.span``;

function CommentBtn({ variant, commentCount, onComment }) {
  return (
    <ButtonIcon
      data-allowpostclick
      action={onComment}
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
