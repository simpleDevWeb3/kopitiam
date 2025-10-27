import styled, { css } from "styled-components";
import Avatar from "../Avatar";
function PostProfile({ avatarSize }) {
  return (
    <ProfileContainer>
      <AvatarContainer $size={avatarSize}>
        <Avatar src="/avatar.jpg" />
      </AvatarContainer>
      <UserName $size={avatarSize}>@c/MalaysiaKini</UserName>
    </ProfileContainer>
  );
}

const usernameSizes = {
  small: "0.7rem",
  medium: "0.9rem",
  large: "1rem",
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

const UserName = styled.div`
  color: var(--primary-color);
  font-weight: 700;
  font-size: ${({ $size }) => usernameSizes[$size] || usernameSizes.medium};
`;

const AvatarContainer = styled.div`
  ${({ $size }) => avatarSizes[$size] || avatarSizes.small};
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

export default PostProfile;
