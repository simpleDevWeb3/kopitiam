import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";

import { PiShareFat } from "react-icons/pi";

const IShare = styled(PiShareFat)``;

function ShareBtn({ variant, onShare }) {
  return (
    <ButtonIcon
      action={onShare}
      variant={
        variant === "comment" || variant === "userCommented" ? "text" : ""
      }
      size="small"
      hover={"background"}
      icon={<IShare />}
    >
      <span>share</span>
    </ButtonIcon>
  );
}

export default ShareBtn;
