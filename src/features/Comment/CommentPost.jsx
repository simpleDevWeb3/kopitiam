import { useParams } from "react-router-dom";
import forumData from "../../data/post";
import PostCard from "../Post/PostCard";
import styled from "styled-components";
import TextFields from "../../components/TextFields";
import { useFieldText } from "../../hook/useFieldText";
import { useAuth } from "../Auth/AuthContext";
import { useModal } from "../../context/ModalContext";
import { useFetchPostComment } from "../Post/useFetchPostComment";
import Spinner from "../../components/Spinner";
import { useCreateComment } from "./useCreateComment";
import { useUser } from "../Auth/useUser";
import toast from "react-hot-toast";

const ShareYourThougt = styled.div`
  border: solid 1px var(--tertiary-color);
  border-radius: 25px;

  padding: 0.5rem;
  padding-left: 1rem;
  color: var(--text-color);
  cursor: pointer;

  &:hover {
    background-color: var(--hover-color);
  }

  transition: background-color 0.15s;
`;

function CommentPost() {
  const { user } = useUser();
  const { createComment } = useCreateComment();
  const { isShowTextField, toggleTextField } = useFieldText();
  const { openModal } = useModal();
  const { postId } = useParams();
  const id = postId;
  const { isAuthenticated } = useAuth();
  const { postComment, isLoadComment, errorComment } = useFetchPostComment(
    id,
    user?.id
  );
  /*T
  const post = forumData.posts.find((post) => post.id === id);*/
  if (isLoadComment) return <Spinner />;
  if (errorComment) return <div>{errorComment}</div>;
  if (!postComment) return <div>Post not found</div>;

  /*
  //Find comment
  const comments = postComment.comments.filter(
    (comment) => comment.postId === post.id
  );

  //Join table
  const postData = { ...post, postComments: comments };
*/
  console.log(postComment);

  const postData = postComment[0];
  console.log("post: ", postData);
  // Inside CommentPost.js

  return (
    <Wrapper>
      <PostCard
        postData={postData}
        variant="post"
        avatarSize="medium"
        onClickComment={() => toggleTextField(postData.id)}
      >
        {/* Now this is INSIDE the PostCard's layout */}
        <br />
        {isAuthenticated && isShowTextField === postData.id ? (
          <TextFields
            onSubmit={(content) => {
              if (user?.is_banned)
                return toast.error("user has been banned by the admin");
              createComment({
                postId: postData.id,
                userId: user.id,
                parentId: null,
                content,
              });
            }}
          />
        ) : (
          <ShareYourThougt
            onClick={() =>
              isAuthenticated
                ? toggleTextField(postData.id)
                : openModal("Login")
            }
          >
            Share Your Thought
          </ShareYourThougt>
        )}
      </PostCard>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  background-color: var(--background-glass);
  padding: 2rem 2rem;
  border-radius: 25px;
  border: solid 1px var(--hover-color);
  box-shadow: 1px 5px 5px var(--hover-color);
`;
export default CommentPost;
