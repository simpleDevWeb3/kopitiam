//Display recommended Post

import styled from "styled-components";
import forumData from "../../data/post";
import { useParams } from "react-router-dom";
import CommentList from "../../components/CommentList";

const CommentSection = styled.div`
  width: 100%;
  min-height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center; /* center posts horizontally */
  padding: 1rem;
  @media (max-width: 1300px) {
    max-width: 100%;
    padding: 0;
  }
`;

function Comment() {
  const { postId } = useParams();
  const id = Number(postId);

  //Find comment
  const comments = forumData.comments.filter(
    (comment) => comment.postId === id
  );

  return (
    <CommentSection>
      <CommentList comments={comments} />
    </CommentSection>
  );
}

export default Comment;
