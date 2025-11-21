import { useParams } from "react-router-dom";
import forumData from "../../data/post";
import PostCard from "../Post/PostCard";
import styled from "styled-components";
import TextFields from "../../components/TextFields";
import { useFieldText } from "../../hook/useFieldText";
import { useAuth } from "../Auth/AuthContext";
import { useModal } from "../../context/ModalContext";

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
  const { isShowTextField, toggleTextField } = useFieldText();
  const { openModal } = useModal();
  const { postId } = useParams();
  const id = postId;
  const { isAuthenticated } = useAuth();
  //Find POST
  const post = forumData.posts.find((post) => post.id === id);

  if (!post) return <div>Post not found</div>;

  //Find comment
  const comments = forumData.comments.filter(
    (comment) => comment.postId === post.id
  );

  //Join table
  const postData = { ...post, postComments: comments };

  return (
    <>
      <PostCard
        postData={postData}
        variant="post"
        avatarSize="medium"
        onClickComment={() => toggleTextField(post.id)}
      ></PostCard>

      {isShowTextField === post.id ? (
        <TextFields />
      ) : (
        <ShareYourThougt
          onClick={() =>
            isAuthenticated ? toggleTextField(post.id) : openModal("Login")
          }
        >
          Share Your Thought
        </ShareYourThougt>
      )}
    </>
  );
}

export default CommentPost;
