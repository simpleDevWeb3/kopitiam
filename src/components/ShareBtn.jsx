import { FaShare } from "react-icons/fa";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";

const IShare = styled(FaShare)``;

function ShareBtn({ variant, onShare }) {
  return (
    <ButtonIcon
      action={onShare}
      variant={variant === "comment" ? "text" : ""}
      size="small"
      hover={"background"}
      icon={<IShare />}
    >
      <span>share</span>
    </ButtonIcon>
  );
}

export default ShareBtn;
