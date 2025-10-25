import styled from "styled-components";
import CommentPost from "../features/Comment/CommentPost";
import Comment from "../features/Comment/Comment";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 2rem 1rem;
  box-sizing: border-box;
  overflow-y: scroll;
  @media (max-width: 1300px) {
    justify-content: left;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 740px; /* Reddit post column width */
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function CommentPage() {
  return (
    <StyledContainer>
      <ContentWrapper>
        <CommentPost />
        <Comment />
      </ContentWrapper>
    </StyledContainer>
  );
}

export default CommentPage;
