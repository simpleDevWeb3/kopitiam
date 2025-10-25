import { useParams } from "react-router-dom";
import forumData from "../../data/post";
import PostCard from "../../components/PostCard";

function CommentPost() {
  const { postId } = useParams();
  const id = Number(postId);

  //Find POST
  const post = forumData.posts.find((post) => post.id === id);

  if (!post) return <div>Post not found</div>;

  //Find comment
  const comments = forumData.comments.filter(
    (comment) => comment.postId === post.id
  );

  //Join table
  const postData = { ...post, postComments: comments };

  const handleVote = (postId, voteType) => {
    console.log("Post", postId, "voted:", voteType);
    // call API or update state
  };

  const handleComment = (postId) => {
    console.log("Comment clicked for post", postId);
  };

  const handleShare = (postId) => {
    console.log("Share clicked for post", postId);
  };

  return (
    <PostCard
      postData={postData}
      variant="post"
      avatarSize="medium"
      onClickVote={(voteType) => handleVote(post.id, voteType)}
      onClickComment={() => handleComment(post.id)}
      onClickShare={() => handleShare(post.id)}
    />
  );
}

export default CommentPost;
