import { HiOutlineArrowDown, HiOutlineArrowUp } from "react-icons/hi";
import styled from "styled-components";

import { variantSize } from "../styles/VariantSize";
import ButtonIcon from "./ButtonIcon";
import { useState } from "react";

const UpVote = styled(HiOutlineArrowUp)``;
const DownVote = styled(HiOutlineArrowDown)``;
const CountVote = styled.span`
  color: var(--primary-color);
`;

const VoteWrapper = styled.div`
  display: flex;
  flex-direction: ${({ $vertical }) => ($vertical ? "column" : "row")};
  align-items: ${({ $center }) => ($center ? "center" : "stretch")};
  ${({ $variant }) => variantSize[$variant] || ""}
`;

function VoteBtn({ variant, votes, userVote = null, onVote }) {
  const [currentVote, setCurrentVote] = useState(userVote);

  const { numUpvote, numDownvote } = votes.reduce(
    (acc, curr) => {
      if (curr.type === "up") acc.numUpvote += 1;
      else if (curr.type === "down") acc.numDownvote += 1;
      return acc;
    },
    { numUpvote: 0, numDownvote: 0 }
  );
  const totalVote = numUpvote - numDownvote;

  function handleVote(e, type) {
    //onVote -> backend logic  pass from parent component 

    e.stopPropagation();
    if (currentVote === type) {
      setCurrentVote(null);
      onVote?.(null);
    } else {
      setCurrentVote(type);
      onVote?.(type);
    }
  }

  return (
    <VoteWrapper $center={true} $variant={variant}>
      <ButtonIcon
        action={(e) => handleVote(e, "up")}
        variant="outline"
        size="rounded_small"
        hover="outline"
        icon={<UpVote />}
        active={currentVote === "up"}
      />

      <CountVote>{totalVote}</CountVote>

      <ButtonIcon
        action={(e) => handleVote(e, "down")}
        variant="outline"
        size="rounded_small"
        hover="icon"
        icon={<DownVote />}
        active={currentVote === "down"}
      />
    </VoteWrapper>
  );
}

export default VoteBtn;
