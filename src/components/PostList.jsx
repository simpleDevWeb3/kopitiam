//Display recommended Post

import styled from "styled-components";
import PostCard from "./PostCard";

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

function PostList({
  postData,
  onClickPost,
  onClickVote,
  onClickComment,
  onClickShare,
}) {
  return (
    <>
      {postData.map((post) => (
        <PostWrapper>
          <PostCard
           
            key={post.id}
            postData={post}
            variant="post"
            avatarSize="medium"
            onClickPost={() => onClickPost?.(post.id)}
            onClickVote={(voteType) => onClickVote?.(post.id, voteType)}
            onClickComment={() => onClickComment?.(post.id)}
            onClickShare={() => onClickShare?.(post.id)}
          />
        </PostWrapper>
      ))}
    </>
  );
}

export default PostList;
