//Display recommended Post

import styled from "styled-components";
import PostCard from "./PostCard";
import React from "react";

const PostWrapper = styled.div`
  width: 100%;

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
  @media (max-width: 800px) {
    border-radius: 0px;
  }

  gap: 0.5rem;
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
          <BreakLine />
        </React.Fragment>
      ))}
    </>
  );
}

export default PostList;
