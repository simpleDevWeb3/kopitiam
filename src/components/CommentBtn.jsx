import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiChatAlt2 } from "react-icons/hi";

const IComment = styled(HiChatAlt2)``;
const CountComment = styled.span`
  color: white;
`;

function CommentBtn({ variant, commentCount, onComment }) {
  return (
    <ButtonIcon
      action={onComment}
      variant={variant === "comment" ? "text" : ""}
      size="small"
      hover="background"
      icon={<IComment />}
    >
      {variant === "comment" ? (
        <span>Reply</span>
      ) : (
        <CountComment>{commentCount}</CountComment>
      )}
    </ButtonIcon>
  );
}

export default CommentBtn;
