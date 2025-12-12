//Display recommended Post

import styled from "styled-components";
import PostCard from "./PostCard";
import React from "react";

const PostWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: start;
  border: solid 1px var(--hover-color);
  background-color: var(--background-glass);
  padding: 1rem 1rem 1rem 1rem;
  &:hover {
    background-color: var(--hover-color);
  }
  transition: background-color 0.15s;
  border-radius: 25px;
  cursor: pointer;
  @media (max-width: 1300px) {
    max-width: 100%;
  }
  @media (max-width: 800px) {
    border-radius: 0px;
  }

  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const BreakLine = styled.hr`
  border: 1px solid var(--tertiary-color);
  width: 100%;
`;

function PostList({
  postData,
  onClickPost,
  onClickVote,
  onClickComment,
  onClickShare,
  onClickProfile,
}) {
  return (
    <>
      {postData.map((post) => (
        <React.Fragment key={post.id}>
          <PostWrapper>
            <PostCard
              postData={post}
              variant="post"
              avatarSize="medium"
              onClickPost={() => onClickPost?.(post.id)}
              onClickVote={(voteType) => onClickVote?.(post.id, voteType)}
              onClickComment={() => onClickComment?.(post.id)}
              onClickShare={() => onClickShare?.(post.id)}
              onClickProfile={(e) => onClickProfile?.(e, post.communityId)}
            />
          </PostWrapper>
        </React.Fragment>
      ))}
    </>
  );
}

export default PostList;
