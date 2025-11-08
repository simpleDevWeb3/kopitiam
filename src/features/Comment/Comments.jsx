//Display recommended Post

import styled from "styled-components";
import forumData from "../../data/post";
import { useParams } from "react-router-dom";
import CommentList from "./CommentList";

function Comments() {
  const { postId } = useParams();
  const id = postId;

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
