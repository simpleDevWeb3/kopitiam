import styled from "styled-components";
import { useParams } from "react-router-dom";
import CommentList from "./CommentList";
import { useFetchPostComment } from "../Post/useFetchPostComment";
import Spinner from "../../components/Spinner";

function Comments() {
  const { postId } = useParams();
  // Simplified: directly use postId
  const { postComment, isLoadComment, errorComment } =
    useFetchPostComment(postId);

  if (isLoadComment) return <Spinner />;
  if (errorComment) return <div>{errorComment}</div>;
  if (!postComment) return <div>Post not found</div>;

  
  const comment = postComment[0]?.comment ?? [];


  if (comment.length === 0) return <div>No Comments</div>;
 

  console.log(comment);

  return (
    <CommentSection>
      <CommentList comments={comment} />
    </CommentSection>
  );
}

const CommentSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 1300px) {
    max-width: 100%;
    padding: 0;
  }
`;

export default Comments;
