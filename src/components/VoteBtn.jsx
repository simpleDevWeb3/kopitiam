import styled from "styled-components";
import { variantSize } from "../styles/VariantSize";
import ButtonIcon from "./ButtonIcon";
import { useState } from "react";
import {
  BiDownvote,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote,
} from "react-icons/bi";

const CountVote = styled.span`
  color: var(--primary-color);
`;

const VoteWrapper = styled.div`
  display: flex;
  flex-direction: ${({ $vertical }) => ($vertical ? "column" : "row")};
  align-items: ${({ $center }) => ($center ? "center" : "stretch")};
  ${({ $variant }) => variantSize[$variant] || ""}
  text-align: center;
`;

function VoteBtn({ variant, votes, userVote = null, onVote }) {
  const { numUpvote, numDownvote } = votes.reduce(
    (acc, curr) => {
      if (curr.type === "up") acc.numUpvote += 1;
      else if (curr.type === "down") acc.numDownvote += 1;
      return acc;
    },
    { numUpvote: 0, numDownvote: 0 }
  );

  const baseVote = numUpvote - numDownvote;

  const [currentVote, setCurrentVote] = useState(userVote);
  const [totalVote, setTotalVote] = useState(baseVote);

  function handleVote(e, type) {
    e.stopPropagation();

    let newTotal = totalVote;

    if (currentVote === type) {
      // undo vote
      newTotal += type === "up" ? -1 : 1;
      setCurrentVote(null);
      onVote?.(null);
    } else if (currentVote === "up" && type === "down") {
      // switch from up → down
      newTotal -= 2;
      setCurrentVote("down");
      onVote?.("down");
    } else if (currentVote === "down" && type === "up") {
      // switch from down → up
      newTotal += 2;
      setCurrentVote("up");
      onVote?.("up");
    } else {
      // first vote
      newTotal += type === "up" ? 1 : -1;
      setCurrentVote(type);
      onVote?.(type);
    }

    setTotalVote(newTotal);
  }

  return (
    <VoteWrapper $center={true} $variant={variant}>
      <ButtonIcon
        action={(e) => handleVote(e, "up")}
        variant={
          variant === "comment" || variant === "userCommented" ? "text" : ""
        }
        size="rounded_small"
        hover="outline"
        icon={currentVote === "up" ? <BiSolidUpvote /> : <BiUpvote />}
        active={currentVote === "up"}
      />

      <CountVote>{totalVote}</CountVote>

      <ButtonIcon
        action={(e) => handleVote(e, "down")}
        variant={
          variant === "comment" || variant === "userCommented" ? "text" : ""
        }
        size="rounded_small"
        hover="icon"
        icon={currentVote === "down" ? <BiSolidDownvote /> : <BiDownvote />}
        active={currentVote === "down"}
      />
    </VoteWrapper>
  );
}

export default VoteBtn;
