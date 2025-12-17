import toast from "react-hot-toast";
import { useModal } from "../context/ModalContext";
import { useUser } from "../features/Auth/useUser";
import { useJoinCommunity } from "../features/Community/useJoinCommunity";
import { useLeaveCommunity } from "../features/Community/useLeaveCommunity";
import ButtonIcon from "./ButtonIcon";
import SpinnerMini from "./SpinnerMini";

function JoinBtn({ community_id, user_id, isJoined }) {
  const { user } = useUser();
  const { leaveCommunity, isLoadingleaveCommunity } = useLeaveCommunity();
  const { joinCommunity, isLoadingJoinCommunity } = useJoinCommunity();
  const { openModal } = useModal();
  const isLoading = isLoadingleaveCommunity || isLoadingJoinCommunity;

  const handleClick = (e) => {
    e.stopPropagation();
    if (!user_id) {
      return openModal("Login");
    }
    if (isLoading) return;

    if (isJoined) {
      leaveCommunity({ community_id, user_id });
    } else {
      if (user?.is_banned)
        return toast.error("user has been banned by the admin.");
      joinCommunity({ community_id, user_id });
    }
  };

  return (
    <ButtonIcon
      variant="outline"
      style={isJoined ? {} : { backgroundColor: " rgba(32, 104, 204, 0.999)" }}
      action={handleClick}
      disabled={isLoading}
    >
      <span
        style={isJoined ? { color: "var(--text-color)" } : { color: "white" }}
      >
        {isLoading ? <SpinnerMini /> : isJoined ? "Joined" : "Join"}
      </span>
    </ButtonIcon>
  );
}

export default JoinBtn;
