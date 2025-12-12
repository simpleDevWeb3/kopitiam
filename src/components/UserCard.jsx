import styled from "styled-components";
import { useUser } from "../features/Auth/useUser";
import { useImperativeHandle, useState, forwardRef, useEffect } from "react";
import Avatar from "./Avatar";

const UserCard = forwardRef(({ editAvatarEl, editBannerEl }, ref) => {
  const { user } = useUser();

  // 1. Initialize local state with data from the database
  const [bannerImage, setBannerImage] = useState(
    user.banner_url ? encodeURI(user.banner_url) : null
  );
  const [iconImage, setIconImage] = useState(
    user.avatar_url ? encodeURI(user.avatar_url) : null
  );

  // 2. Local state for text (allows live typing preview)
  const [previewName, setPreviewName] = useState(user.name);
  const [previewBio, setPreviewBio] = useState(user.bio);

  // 3. Expose update functions to parent
  useImperativeHandle(ref, () => ({
    updateBanner: (newUrl) => setBannerImage(newUrl),
    updateAvatar: (newUrl) => setIconImage(newUrl),
    updateName: (newName) => setPreviewName(newName),
    updateBio: (newBio) => setPreviewBio(newBio),
  }));

  useEffect(() => {
    setBannerImage(user.banner_url ? encodeURI(user.banner_url) : null);
    setIconImage(user.avatar_url ? encodeURI(user.avatar_url) : null);
    setPreviewName(user.name);
    setPreviewBio(user.bio);
  }, [user]);

  return (
    <PreviewCard>
      <Banner $image={bannerImage} $fallbackColor="rgba(11, 111, 242, 0.9)">
        {editBannerEl}
      </Banner>
      <ProfileContent>
        <AvatarContainer>
          {editAvatarEl}
          <Avatar src={iconImage} />
        </AvatarContainer>

        <ProfileDetails>
          {/* Use previewName instead of user.name */}
          <h3>u/{previewName}</h3>
          <p>1 follows</p>
        </ProfileDetails>
      </ProfileContent>

      {/* Use previewBio instead of user.bio */}
      <Description>{previewBio}</Description>
    </PreviewCard>
  );
});

// --- YOUR ORIGINAL STYLES ---

const PreviewCard = styled.div`
  border: 1px solid var(--hover-color);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 5px 10px var(--hover-color);
`;

const Banner = styled.div`
  position: relative;
  height: 5rem;
  background-color: ${(props) => props.$fallbackColor || "#0b6ff2"};
  background-image: ${(props) =>
    props.$image ? `url(${props.$image})` : "none"};
  background-size: cover;
  background-position: center;
`;

const ProfileContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1rem 0;
`;

const AvatarContainer = styled.div`
  position: relative;
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid white;
  margin-top: -1.5rem;
  background-color: #fff;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  & h3 {
    margin: 0;
    font-size: 1rem;
  }
  & p {
    margin: 0;
    color: #777;
    font-size: 0.85rem;
  }
`;

const Description = styled.p`
  padding: 0 1rem 1rem;
  color: #555;
  font-size: 0.9rem;
  word-wrap: break-word;
`;

export default UserCard;
