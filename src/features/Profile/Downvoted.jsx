import styled from "styled-components";
import forumData from "../../data/post";
import PostList from "../Post/PostList";

function Downvoted() {
  const { posts } = forumData;
  return (
    <StyledContainer>
      <PostList postData={posts} />
    </StyledContainer>
  );
}

export default Downvoted;
const StyledContainer = styled.div`
  height: 100vh;
`;
