import styled from "styled-components";
import ButtonIcon from "../../components/ButtonIcon";
import Input from "../../components/Input";
import SpinnerMini from "../../components/SpinnerMini";
import Avatar from "../../components/Avatar";
import { useRef, useState } from "react";
import { useModal } from "../../context/ModalContext";
import { handleFileImgUpload } from "../../helpers/formHelper";
import { FaCamera } from "react-icons/fa";
import { useEditCommunity } from "../Community/useEditCommunity"; // Adjust path

function EditCommunityForm() {
  const { closeModal, modalData } = useModal();

  // 1. Hook for API Mutation
  const { editCommunity, isEditing } = useEditCommunity(closeModal);

  // 2. Local State for Form Data
  const [name, setName] = useState(modalData?.name || "");
  const [description, setDescription] = useState(modalData?.description || "");

  // 3. Local State for Images (Files & Previews)
  const [bannerFile, setBannerFile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  // Initialize previews with existing URLs from modalData
  const [previewBanner, setPreviewBanner] = useState(
    modalData?.bannerUrl ? encodeURI(modalData.bannerUrl) : null
  );
  const [previewAvatar, setPreviewAvatar] = useState(
    modalData?.avatarUrl ? encodeURI(modalData.avatarUrl) : null
  );

  // Refs for hidden inputs
  const bannerInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  // --- Handlers ---

  const onTriggerBannerUpload = (e) => {
    e.preventDefault();
    bannerInputRef.current?.click();
  };

  const onTriggerAvatarUpload = (e) => {
    e.preventDefault();
    avatarInputRef.current?.click();
  };

  function handleBannerChange(e) {
    // 1. Update Preview immediately
    const setPreview = (imgSrc) => setPreviewBanner(imgSrc);
    // 2. Store File for upload
    const saveFile = (_, file) => setBannerFile(file);

    handleFileImgUpload(e, setPreview, saveFile, "banner");
  }

  function handleAvatarChange(e) {
    const setPreview = (imgSrc) => setPreviewAvatar(imgSrc);
    const saveFile = (_, file) => setAvatarFile(file);

    handleFileImgUpload(e, setPreview, saveFile, "avatar");
  }

  function handleSubmit() {
    // Check if name is empty
    if (!name.trim()) return;

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    // Only append files if they were changed
    if (bannerFile) formData.append("BannerFile", bannerFile);
    if (avatarFile) formData.append("AvatarFile", avatarFile);

    editCommunity({
      id: modalData?.id,
      name,
      description,
      bannerUrl: bannerFile,
      avatarUrl: avatarFile,
    });
  }
  console.log("modalGroup: ", modalData);
  return (
    <Container>
      <h1>Edit Community</h1>

      {/* --- PREVIEW CARD SECTION --- */}
      <CardWrapper>
        <CommunityPreviewCard>
          <BannerArea $image={previewBanner}>
            <BannerUploadBtn
              onClick={onTriggerBannerUpload}
              title="Change Banner"
            >
              <FaCamera /> <span>Edit Banner</span>
            </BannerUploadBtn>
          </BannerArea>

          <ContentArea>
            <AvatarWrapper>
              <AvatarUploadBtn
                onClick={onTriggerAvatarUpload}
                title="Change Icon"
              >
                <FaCamera />
              </AvatarUploadBtn>
              {/* Reusing your Avatar component or fallback img */}
              <StyledAvatar src={previewAvatar || "/default-community.png"} />
            </AvatarWrapper>

            <InfoText>
              <h3>c/{name || "community_name"}</h3>
              <p>
                {modalData?.topics?.length || 0} topics •{" "}
                {modalData?.isJoined ? "Joined" : "Public"}
              </p>
            </InfoText>
          </ContentArea>
        </CommunityPreviewCard>
      </CardWrapper>

      {/* --- HIDDEN INPUTS --- */}
      <HiddenInput
        type="file"
        ref={bannerInputRef}
        onChange={handleBannerChange}
        accept="image/*"
      />
      <HiddenInput
        type="file"
        ref={avatarInputRef}
        onChange={handleAvatarChange}
        accept="image/*"
      />

      {/* --- FORM FIELDS --- */}
      <br />
      <Input
        label="Community Name"
        initialValue={name || modalData?.name} // Controlled input
        handleInput={(e) => setName(e.target.value)}
      >
        Community Name
      </Input>

      <br />
      <Input
        label="Description"
        initialValue={description || modalData?.description} // Controlled input
        handleInput={(e) => setDescription(e.target.value)}
      >
        Description
      </Input>

      <br />
      <BtnContainer>
        <ButtonIcon
          disabled={isEditing}
          onClick={closeModal}
          variation="secondary"
        >
          Cancel
        </ButtonIcon>
        <ButtonIcon disabled={isEditing} onClick={handleSubmit}>
          {isEditing ? <SpinnerMini /> : "Confirm Changes"}
        </ButtonIcon>
      </BtnContainer>
    </Container>
  );
}

// --- STYLES ---

const Container = styled.div`
  min-width: 35rem; /* Slightly wider for community cards */
  color: var(--text-color);

  @media (max-width: 600px) {
    min-width: 90vw;
  }
`;

const CardWrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  width: 100%;
`;

/* Simulating a Community Card Look */
const CommunityPreviewCard = styled.div`
  border: 1px solid var(--hover-color);
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--bg-color);
  display: flex;
  flex-direction: column;
`;

const BannerArea = styled.div`
  position: relative;
  height: 6rem;
  background-color: #33a6b8; /* Fallback color */
  background-image: ${(props) =>
    props.$image ? `url(${props.$image})` : "none"};
  background-size: cover;
  background-position: center;
`;

const ContentArea = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem 1rem 1rem;
  gap: 1rem;
`;

const AvatarWrapper = styled.div`
  position: relative;
  margin-top: -2rem; /* Pull avatar up into banner */
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  border: 4px solid var(--bg-color, #fff); /* Create separation */
  background-color: #fff;
  flex-shrink: 0;
`;

const StyledAvatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.2rem;

  h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 700;
  }

  p {
    margin: 0;
    font-size: 0.85rem;
    color: var(--text-muted, #777);
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

/* Reused Button Styles */
const FloatingBtn = styled.button`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  z-index: 10;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    transform: scale(1.05);
  }
`;

const BannerUploadBtn = styled(FloatingBtn)`
  top: 0.5rem;
  right: 0.5rem;
  padding: 6px 12px;
  border-radius: 20px;
  gap: 8px;

  span {
    font-size: 0.8rem;
    font-weight: 600;
  }
`;

const AvatarUploadBtn = styled(FloatingBtn)`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  opacity: 0; /* Hidden by default, shown on hover */

  &:hover {
    opacity: 1;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export default EditCommunityForm;
