import styled from "styled-components";
import forumData from "../../data/post";
import PostList from "../Post/PostList";

function History() {
  const { posts } = forumData;
  return (
    <StyledContainer>
      <PostList postData={posts} />
    </StyledContainer>
  );
}

export default History;
const StyledContainer = styled.div`
  height: 100vh;
`;
