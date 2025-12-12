import styled from "styled-components";
import UserCard from "../../components/UserCard";
import ButtonIcon from "../../components/ButtonIcon";
import Input from "../../components/Input";
import { useRef, useState } from "react";
import { useModal } from "../../context/ModalContext";
import { handleFileImgUpload } from "../../helpers/formHelper";

// 1. Import the icon you want (ensure you have installed: npm install react-icons)
import { FaCamera } from "react-icons/fa";
import { useEditAccount } from "../Settings/useEditAccount";
import SpinnerMini from "../../components/SpinnerMini";

function EditProfile() {
  const { closeModal, modalData } = useModal();
  const { editAccount, isLoadEditAccount, errorEditAccount } =
    useEditAccount(closeModal);
  const refUserCard = useRef(null);

  // Refs for triggering hidden inputs
  const bannerInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  const [username, setUserName] = useState("");
  const [description, setDescription] = useState("");

  // Store actual files for submission
  const [bannerFile, setBannerFile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  function handleUsername(value) {
    setUserName(value);
    refUserCard.current?.updateName(value);
  }

  function handleDescription(value) {
    setDescription(value);
    refUserCard.current?.updateBio(value);
  }

  // --- File Upload Logic ---

  // Trigger hidden input clicks
  const onTriggerBannerUpload = (e) => {
    e.preventDefault();
    bannerInputRef.current?.click();
  };

  const onTriggerAvatarUpload = (e) => {
    e.preventDefault();
    avatarInputRef.current?.click();
  };

  // Handle file changes
  function handleBannerChange(e) {
    const setPreview = (fileImg) => refUserCard.current?.updateBanner(fileImg);
    const saveFile = (field, file) => setBannerFile(file); // Save file for submit
    handleFileImgUpload(e, setPreview, saveFile, "banner");
  }

  function handleAvatarChange(e) {
    const setPreview = (fileImg) => refUserCard.current?.updateAvatar(fileImg);

    const saveFile = (field, file) => setAvatarFile(file); // Save file for submit
    handleFileImgUpload(e, setPreview, saveFile, "avatar");
  }

  function handleSubmit() {
    console.log(modalData);
    console.log("Submit:", { username, description, bannerFile, avatarFile });
    editAccount({
      user_id: modalData?.id,
      formData: {
        name: username,
        bio: description,
        BannerFile: bannerFile,
        AvatarFile: avatarFile,
      },
    });
  }

  return (
    <Container>
      <h1>Edit Profile</h1>

      {/* Wrapper for absolute positioning */}
      <CardWrapper>
        <UserCard
          ref={refUserCard}
          editBannerEl={
            <BannerUploadBtn
              onClick={onTriggerBannerUpload}
              title="Change Banner"
            >
              <FaCamera /> <span>Edit Banner</span>
            </BannerUploadBtn>
          }
          editAvatarEl={
            <AvatarUploadBtn
              onClick={onTriggerAvatarUpload}
              title="Change Avatar"
            >
              <FaCamera />
            </AvatarUploadBtn>
          }
        />
      </CardWrapper>

      {/* Hidden Inputs */}
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

      <br />
      <Input
        handleInput={(e) => handleUsername(e.target.value)}
        initialValue={username || modalData?.name}
      >
        username
      </Input>
      <br />
      <Input
        handleInput={(e) => handleDescription(e.target.value)}
        initialValue={description || modalData?.bio}
      >
        description
      </Input>
      <br />
      <BtnContainer>
        <ButtonIcon disabled={isLoadEditAccount}>Cancel</ButtonIcon>
        <ButtonIcon disabled={isLoadEditAccount} onClick={handleSubmit}>
          {isLoadEditAccount ? <SpinnerMini /> : "Confirm"}
        </ButtonIcon>
      </BtnContainer>
    </Container>
  );
}

// --- STYLES ---

const Container = styled.div`
  min-width: 30rem;
  color: var(--text-color);
`;

const CardWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const HiddenInput = styled.input`
  display: none;
`;

// Base style for the upload button overlay
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

// Specific style for Banner Button (Top Right)
const BannerUploadBtn = styled(FloatingBtn)`
  top: 0.5rem;
  right: 0.5rem;
  padding: 8px 12px;
  border-radius: 20px;
  gap: 8px;

  /* Style the react-icon specifically if needed */
  svg {
    font-size: 1rem;
  }

  span {
    font-size: 0.85rem;
    font-weight: 600;
  }
`;

// Specific style for Avatar Button (Over the Avatar)
// You must adjust 'left'/'bottom' to match exactly where your avatar is in UserCard
const AvatarUploadBtn = styled(FloatingBtn)`
  top: 0.3rem;

  left: 0.35rem;

  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 2px solid var(--bg-color, #fff); /* Border matches bg to create separation */

  svg {
    font-size: 1rem;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 1rem;
  gap: 0.5rem;
`;

export default EditProfile;
