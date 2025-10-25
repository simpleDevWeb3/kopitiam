//Display recommended Post

import styled from "styled-components";
import forumData from "../../data/post";

import { useNavigate } from "react-router-dom";
import PostList from "../../components/PostList";

const StyledContainer = styled.div`
  width: 100%;
  min-height: 100%;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: center; /* center posts horizontally */

  @media (max-width: 1300px) {
    max-width: 100%;
    padding: 0;
  }
`;

const PostWrapper = styled.div`
  width: 100%;
  max-width: 700px; /* limit width for each post */

  display: flex;
  flex-direction: column;
  align-items: start;
  border-radius: 25px;
  padding: 1rem 1rem 0rem 1rem;
  &:hover {
    background-color: rgba(160, 158, 158, 0.1);
  }
  transition: background-color 0.15s;

  cursor: pointer;
  @media (max-width: 1300px) {
    max-width: 100%;
  }

  gap: 0.5rem;
`;

const BreakLine = styled.hr`
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  margin-top: 1rem;
`;

function HomePosts() {
  const navigate = useNavigate();
  //fetch data api example
  const { posts, comments } = forumData;

  // join post and comment table
  const postData = posts.map((post) => {
    return {
      ...post,
      postComments: comments.filter((c) => c.postId === post.id),
    };
  });


  const handleClickPost = (postId) => {
    console.log("Post clicked:", postId);
    navigate(`comment/${postId}`);
  };

  return (
    <StyledContainer>
      <PostList postData={postData} onClickPost={handleClickPost} />
    </StyledContainer>
  );
}

export default HomePosts;
