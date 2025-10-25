import styled, { css } from "styled-components";
import Text from "./Text";
import ButtonIcon from "./ButtonIcon";
import { createContext, useContext } from "react";
import {
  HiChatAlt2,
  HiShare,
  HiOutlineArrowUp,
  HiOutlineArrowDown,
} from "react-icons/hi";

import { usePost } from "../hook/PostHook/usePosts";
import { FaShare } from "react-icons/fa";
import Avatar from "./Avatar";

// Define variant styles (for post or comment)
const variantSize = {
  post: css`
    font-size: 1rem;
    gap: 0.5rem;

    svg {
      width: 1.2rem;
      height: 1.2rem;
    }

    @media (max-width: 768px) {
      font-size: 0.9rem;
      gap: 0.4rem;

      svg {
        width: 1rem;
        height: 1rem;
      }
    }

    @media (max-width: 480px) {
      font-size: 0.8rem;
      gap: 0.3rem;

      svg {
        width: 0.9rem;
        height: 0.9rem;
      }
    }
  `,

  comment: css`
    font-size: 0.8rem;
    gap: 0.5rem;

    svg {
      width: 0.9rem;
      height: 0.8rem;
    }

    @media (max-width: 768px) {
      font-size: 0.75rem;
      gap: 0.4rem;

      svg {
        width: 0.8rem;
        height: 0.7rem;
      }
    }

    @media (max-width: 480px) {
      font-size: 0.7rem;
      gap: 0.3rem;

      svg {
        width: 0.7rem;
        height: 0.6rem;
      }
    }
  `,
};

const StyledPost = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 1rem;
  ${({ $variant }) => variantSize[$variant] || variantSize.post}
`;

const Grouped = styled.div`
  display: flex;
  flex-direction: ${({ $vertical }) => ($vertical ? "column" : "row")};
  align-items: ${({ $center }) => ($center ? "center" : "stretch")};
  ${({ $variant }) => variantSize[$variant] || ""}
`;

const PostContext = createContext({});

// Main Post component
function Post({ post, children, toComment, variant = "post", comments }) {
  const { data, state, actions } = usePost(post, toComment, comments);

  const properties = {
    ...data,
    ...state,
    ...actions,
    variant,
  };

  return (
    <PostContext.Provider value={properties}>
      <StyledPost
        $variant={variant}
        onClick={() => (toComment ? actions.handleNavigate() : "")}
      >
        {children}
      </StyledPost>
    </PostContext.Provider>
  );
}

// Subcomponents
Post.Title = function Title() {
  const { title, content, variant } = useContext(PostContext);
  return (
    <Grouped $vertical={true} $variant={variant}>
      {title && <Text as="Title">{title}</Text>}
      <Text variant={variant}>{content}</Text>
    </Grouped>
  );
};

const UpVote = styled(HiOutlineArrowUp)``;
const DownVote = styled(HiOutlineArrowDown)``;
const CountVote = styled.span`
  color: var(--primary-color);
`;

Post.Vote = function Vote() {
  const { variant, handleDownVote, handleUpVote, upVote, downVote, votes } =
    useContext(PostContext);

  const { numUpvote, numDownvote } = votes.reduce(
    (acc, curr) => {
      if (curr.type === "up") acc.numUpvote += 1;
      else if (curr.type === "down") acc.numDownvote += 1;
      return acc;
    },
    { numUpvote: 0, numDownvote: 0 }
  );
  const totalVote = numUpvote - numDownvote > 0 ? numUpvote - numDownvote : 0;
  console.log(numUpvote, numDownvote);

  return (
    <Grouped $center={true} $variant={variant}>
      <ButtonIcon
        action={(e) => handleUpVote(e)}
        variant="outline"
        size="rounded_small"
        hover="outline"
        icon={<UpVote />}
        active={upVote}
      />

      <CountVote>{totalVote}</CountVote>

      <ButtonIcon
        action={(e) => handleDownVote(e)}
        variant="outline"
        size="rounded_small"
        hover="icon"
        icon={<DownVote />}
        active={downVote}
      />
    </Grouped>
  );
};

const IShare = styled(FaShare)``;
const IComment = styled(HiChatAlt2)``;
const CountComment = styled.span`
  color: white;
`;
Post.Share = function Share() {
  const { variant, UpVote } = useContext(PostContext);
  return (
    <ButtonIcon
      variant={variant === "comment" ? "text" : ""}
      size="small"
      hover={"background"}
      icon={<IShare />}
    >
      <span>share</span>
    </ButtonIcon>
  );
};

Post.Comment = function Comment() {
  const { variant, commentCount } = useContext(PostContext);
  return (
    <ButtonIcon
      variant={variant === "comment" ? "text" : ""}
      size="small"
      hover="background"
      icon={<IComment />}
    >
      {variant === "comment" ? (
        <span>Reply</span>
      ) : (
        <CountComment>{commentCount}</CountComment>
      )}
    </ButtonIcon>
  );
};
const avatarSizes = {
  small: css`
    width: 1.8rem;
    height: 1.8rem;
  `,
  medium: css`
    width: 2.2rem;
    height: 2.2rem;
  `,
  large: css`
    width: 5rem;
    height: 5rem;
  `,
};
const AvatarContainer = styled.div`
  ${({ size }) => avatarSizes[size] || avatarSizes.small};
  border-radius: 50%;
  overflow: hidden;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; /* vertical align */
  gap: 0.5rem; /* spacing between avatar and name */
  margin-bottom: 0.5rem;
`;
const usernameSizes = {
  small: "0.7rem",
  medium: "0.9rem",
  large: "1rem",
};

const UserName = styled.div`
  color: var(--primary-color);
  font-weight: 700;
  font-size: ${({ size }) => usernameSizes[size] || usernameSizes.medium};
`;

Post.Avatar = ({ size = "small" }) => {
  return (
    <ProfileContainer>
      <AvatarContainer size={size}>
        <Avatar src="/avatar.jpg" />
      </AvatarContainer>
      <UserName>@c/MalaysiaKini</UserName>
    </ProfileContainer>
  );
};

Post.Image = function Image() {
  const { variant } = useContext(PostContext);
  return (
    <Grouped $vertical={true} $variant={variant}>
      Image placeholder
    </Grouped>
  );
};

export default Post;
