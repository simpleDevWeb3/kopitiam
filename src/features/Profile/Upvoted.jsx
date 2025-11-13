import styled from "styled-components";
import forumData from "../../data/post";
import PostList from "../Post/PostList";

function Upvoted() {
  const { posts } = forumData;
  return (
    <StyledContainer>
      <PostList postData={posts} />
    </StyledContainer>
  );
}

export default Upvoted;
const StyledContainer = styled.div`
  height: 100vh;
`;
