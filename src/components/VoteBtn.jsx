import styled from "styled-components";
import { variantSize } from "../styles/VariantSize";
import ButtonIcon from "./ButtonIcon";
import { useState, useEffect } from "react";
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

// Helper to convert boolean/null to string state
const getVoteStatus = (userVote) => {
  if (userVote === true) return "up"; // choosen
  if (userVote === false) return "down";
  return null;
};

function VoteBtn({ userVote = null, onVote }) {
  const { isAuthenticated } = useAuth();
  const { openModal } = useModal();
  const { postData, variant } = usePost();

  // Calculate base score from props
  const baseScore =
    (postData.total_upVote || 0) - (postData.total_downVote || 0); // 1

  // Local State
  const [currentVote, setCurrentVote] = useState(() => getVoteStatus(userVote)); //true -> "up" -> "FALSE"
  const [totalVote, setTotalVote] = useState(baseScore); //1

  // 1. SYNC WITH REACT QUERY:
  // When invalidation happens and parent passes new props, update local state

  useEffect(() => {
    setTotalVote((postData.total_upVote || 0) - (postData.total_downVote || 0));
  }, [userVote, postData.total_upVote, postData.total_downVote, setTotalVote]); // AWAIT

  function handleVote(e, type) {
    e.stopPropagation();
    if (!isAuthenticated) return openModal("Login");

    let newTotal = totalVote; // 1
    const previousVote = currentVote; //UP // Capture current  state before changing // 1

    // 2. LOGIC FIX: Compare against state 'previousVote', not a function
    if (previousVote === type) {
      // Undo vote
      newTotal += type === "up" ? -1 : 1;
      setCurrentVote(null);
      // Pass null to indicate removal
      onVote?.(type);
    } else if (previousVote === "up" && type === "down") {
      // Switch Up -> Down (-1 to remove up, -1 to add down = -2)
      newTotal -= 2;
      setCurrentVote("down");
      onVote?.("down");
    } else if (previousVote === "down" && type === "up") {
      // Switch Down -> Up (+1 to remove down, +1 to add up = +2)
      newTotal += 2;
      setCurrentVote("up");
      onVote?.("up");
    } else {
      // New Vote (was null)
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
        // 3. UI FIX: use currentVote state
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
        // 3. UI FIX: use currentVote state
        icon={currentVote === "down" ? <BiSolidDownvote /> : <BiDownvote />}
        active={currentVote === "down"}
      />
    </VoteWrapper>
  );
}

export default VoteBtn;
