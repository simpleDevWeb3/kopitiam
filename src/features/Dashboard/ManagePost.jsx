import styled from "styled-components";
import forumData from "../../data/post";
import PostList from "../Post/PostList";

function ManagePost() {
  const { posts } = forumData;
  return (
    <Container>
      <h1>ManagePost</h1>
      <PostList postData={posts} />
    </Container>
  );
}
const Container = styled.div`
  max-width: 1000px;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
`;
export default ManagePost;
