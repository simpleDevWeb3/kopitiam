import { useUser } from "../Auth/useUser";
import { useVotePost } from "../Vote/useVotePost";

/*
--data '{
  "vote_id": null,
  "post_id": null,
  "user_id": null,
  "comment_id": null,
  "is_upvote": true,
  "created_at": null
   */
export function usePostHandler() {
  const { votePost } = useVotePost();
  const { user } = useUser();

  const handleVote = (post_id = null, comment_id = null, voteType) => {
    console.log("Post", post_id, "voted:", voteType);
    console.log("Comment", comment_id, "voted:", voteType);
    let userVote = null;
    if (voteType === "up") {
      userVote = true;
    } else if (voteType === "down") {
      userVote = false;
    }

    votePost({
      post_id,
      comment_id,
      user_id: user.id,
      is_upvote: userVote,
    });
  };

  const handleShare = (post_id) => {
    console.log("Share clicked for post", postId);
  };

  const handlePost = () => {
    console.log("posting...");
  };

  return { handleVote, handleShare, handlePost };
}
