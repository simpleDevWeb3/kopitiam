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
import { usePost } from "../features/Post/PostContext";
import { useAuth } from "../features/Auth/AuthContext";
import { useModal } from "../context/ModalContext";

const CountVote = styled.span`
  color: var(--primary-color);
`;

const VoteWrapper = styled.div`
  display: flex;
  flex-direction: ${({ $vertical }) => ($vertical ? "column" : "row")};
  align-items: ${({ $center }) => ($center ? "center" : "stretch")};
  ${({ $variant }) => variantSize[$variant] || ""}
  text-align: center;
  gap: 0.5rem;
`;

function VoteBtn({ userVote = null, onVote }) {
  const { isAuthenticated } = useAuth();
  const { openModal } = useModal();
  const { postData, variant } = usePost();

  const baseVote = postData.total_upVote - postData.total_downVote;

  const [currentVote, setCurrentVote] = useState(userVote);
  const [totalVote, setTotalVote] = useState(baseVote);

  function handleVote(e, type) {
    e.stopPropagation();
    if (!isAuthenticated) return openModal("Login");
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
