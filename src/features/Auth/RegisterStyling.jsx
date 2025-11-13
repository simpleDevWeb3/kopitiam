import { useState } from "react";
import styled from "styled-components";
import Avatar from "../../components/Avatar";
import { PiPictureInPicture } from "react-icons/pi";
import { FcPicture } from "react-icons/fc";
import { AiFillPicture } from "react-icons/ai";

function RegisterStyling({ formData, onChange }) {
  const [bannerImage, setBannerImage] = useState(null);
  const [iconImage, setIconImage] = useState("/avatar.jpg");

  function handleBannerUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBannerImage(imageUrl);
      onChange("banner", imageUrl);
    }
  }

  function handleIconUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setIconImage(imageUrl);
      onChange("icon", imageUrl);
    }
  }

  return (
    <Wrapper>
      <Header>
        <h2>Style Your Profile</h2>
        <p>Personalize your profile’s look to make it stand out.</p>
      </Header>

      <MainSection>
        {/* LEFT PANEL */}
        <LeftPanel>
          <SectionTitle>Appearance</SectionTitle>

          {/* Banner Upload */}
          <OptionGroup>
            <label style={{ flex: 1 }}>Banner Image</label>
            <UploadInput
              type="file"
              accept="image/*"
              id="bannerUpload"
              onChange={handleBannerUpload}
            />
            <UploadLabel htmlFor="bannerUpload">
              {" "}
              Add
              <AiFillPicture />
            </UploadLabel>
          </OptionGroup>

          {/* Icon Upload */}
          <OptionGroup>
            <label style={{ flex: 1 }}>Profile Icon</label>
            <UploadInput
              type="file"
              accept="image/*"
              id="iconUpload"
              onChange={handleIconUpload}
            />
            <UploadLabel htmlFor="iconUpload">
              Add
              <AiFillPicture />
            </UploadLabel>
          </OptionGroup>
        </LeftPanel>

        {/* RIGHT PANEL */}
        <RightPanel>
          <SectionTitle>Preview</SectionTitle>
          <PreviewCard>
            <Banner
              $image={bannerImage}
              $fallbackColor="rgba(11, 111, 242, 0.9)"
            />
            <ProfileContent>
              <AvatarContainer>
                <Avatar src={iconImage} />
              </AvatarContainer>

              <ProfileDetails>
                <h3>u/{formData?.username || "Your Username"}</h3>
                <p>1 follows</p>
              </ProfileDetails>
            </ProfileContent>

            <Description>
              {formData?.userDescription ||
                "This is where your Profile description will appear."}
            </Description>
          </PreviewCard>
        </RightPanel>
      </MainSection>
    </Wrapper>
  );
}

export default RegisterStyling;

// ---------- STYLES ----------

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Header = styled.div`
  & h2 {
    font-size: 1.6rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
  }
  & p {
    color: #6b6b6b;
    font-size: 0.9rem;
  }
`;

const MainSection = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  @media (max-width: 800px) {
    flex-direction: column-reverse;
  }
`;

const LeftPanel = styled.div`
  flex: 1;
  min-width: 240px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RightPanel = styled.div`
  flex: 2;
  max-width: 20rem;
  margin-right: 1rem;
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const OptionGroup = styled.div`
  display: flex;

  gap: 1rem;

  & label {
    font-weight: 500;
    color: var(--text-color);
  }
`;

const UploadInput = styled.input`
  display: none;
`;

const UploadLabel = styled.label`
  background-color: var(--hover-color, #0b6ff2);

  border: none;
  padding: 0.4rem 1rem;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  text-align: center;
  width: fit-content;
  transition: 0.2s;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  &:hover {
    opacity: 0.9;
  }
`;

const PreviewCard = styled.div`
  border: 1px solid var(--hover-color);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 5px 10px var(--hover-color);
`;

const Banner = styled.div`
  background-color: var(--hover-color, #0b6ff2);
  background-image: ${(props) =>
    props.$image ? `url(${props.$image})` : "none"};
  background-size: cover;
  background-position: center;
  height: 5rem;
`;

const ProfileContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1rem 0;
`;

const AvatarContainer = styled.div`
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
