import styled from "styled-components";
import Search from "../../components/Search";
import { Dropdown } from "../../components/Dropdown";
import { HiArrowDown, HiPencil } from "react-icons/hi2";
import { HiChevronDown } from "react-icons/hi";
import Filter from "../../components/Filter";
import { BsTrashFill, BsUpload } from "react-icons/bs";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import ButtonIcon from "../../components/ButtonIcon";
import { usePostForm } from "./usePostForm";
import { useModal } from "../../context/ModalContext";
import Avatar from "../../components/Avatar";
import Carousel from "../../components/Carousel";
import { useRef, useMemo, useState } from "react"; // Added useMemo for performance
import { PiPencil } from "react-icons/pi";
import { useEditPost } from "./useEditPost";
import SpinnerMini from "../../components/SpinnerMini";

function EditForm() {
  // data passed from modal
  const { modalData, closeModal } = useModal();
  const { editPost, isLoadEditPost, errorEditPost } = useEditPost(
    modalData?.id,
    modalData?.user_id,
    closeModal
  );
  // index for determine which image to be edit
  const [editingIndex, setEditingIndex] = useState(null);
  // carousel ref for retrieving current image slide to edit
  const carouselRef = useRef(null);

  // image input ref to trigger open folder
  const fileInputRef = useRef(null);

  const {
    formData,
    error,
    isShowDeleteBtn,
    handleChange,
    handleMouseEnter,
    handleMouseLeave,
    handleSubmit,
    setFormData,
  } = usePostForm(onFormSuccess, modalData);

  function onFormSuccess(validatedFormData) {
    // 1. Get the list of all original IDs in order (derived from the object keys)
    // Assumption: The order of keys in postImage_url matches the order of images displayed
    const allOriginalIds = modalData?.postImage_url
      ? Object.keys(modalData.postImage_url)
      : [];

    const idsToSend = [];
    const filesToSend = [];

    // 2. Loop through the CURRENT form state (which has mixed Strings and Files)
    if (formData.image && Array.isArray(formData.image)) {
      formData.image.forEach((imgItem, index) => {
        // CHECK: Is this item a newly selected FILE?
        if (imgItem instanceof File) {
          // Push the File to the list
          filesToSend.push(imgItem);

          // Find the matching ID based on the index and push it
          if (allOriginalIds[index]) {
            idsToSend.push(allOriginalIds[index]);
          }
        }
        // If it is a String (URL), we do nothing. We don't need to send it to the backend.
      });
    }

    // 3. Construct the payload
    // Your useEditPost hook or API service MUST convert this to FormData
    const finalData = {
      ...validatedFormData,
      post_id: modalData?.id,
      topic_id: modalData?.topic_id,
      community_id: modalData?.community_id,

      // SEND ONLY THE MATCHING PAIRS
      original_image_id: idsToSend,
      new_image: filesToSend,
    };

  
    editPost(finalData);

  }
  // 1. Convert the image data (Object or Array) into a consistent Array for the UI
  const imagesToDisplay = useMemo(() => {
    if (!formData.image) return [];
    // If it's the object from Supabase logs { key: url }
    if (typeof formData.image === "object" && !Array.isArray(formData.image)) {
      return Object.values(formData.image);
    }
    // If it's an array (e.g. after adding new files)
    return formData.image;
  }, [formData.image]);

  console.log(modalData);
  console.log("from form: ", formData);

  const handleEditImageClick = () => {
    if (carouselRef.current) {
      //1. get index from carousel
      const currentIndex = carouselRef.current.getIndex();
      console.log("Current image index is:", currentIndex);

      //2. set the index for the input to replace the image
      setEditingIndex(currentIndex);
      fileInputRef.current.click();
    }
  };

  const handleFileImageEditChange = (e) => {
    console.log("editingIndex ", editingIndex);

    // store new image
    const file = e.target.files[0];
    if (!file) return;

    // replace the current index image
    const updatedImages = [...imagesToDisplay];

    updatedImages[editingIndex] = file;
    console.log("images: ", updatedImages);

    setFormData((prev) => ({
      ...prev,
      image: updatedImages,
    }));
    // Reset the tracking index
    setEditingIndex(null);
  };
  return (
    <Layout>
      <FormContainer
        onSubmit={(e) =>
          handleSubmit(e, { selectedTopic: modalData?.topic_id })
        }
      >
        {error && <ErrorMsg>{error}</ErrorMsg>}

        <FormGroup>
          <Label>Title</Label>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />
        </FormGroup>

        {/* --- FIX: Use imagesToDisplay.length instead of formData.image.length --- */}
        {imagesToDisplay.length > 0 && (
          <>
            <FormGroup>
              <FileInput
                ref={fileInputRef}
                type="file"
                multiple
                id="image"
                accept="image/*"
                onChange={handleFileImageEditChange}
              />
              <ImageContainer
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Carousel
                  scrollLastAuto={true}
                  total={imagesToDisplay.length} // Fix: Use array length
                  hideWhenCurrentSlide={true}
                  ref={carouselRef}
                >
                  <Carousel.Count />
                  <Carousel.Track>
                    {/* Fix: Map over the normalized array */}
                    {imagesToDisplay.map((img, i) => (
                      <Carousel.Card key={i}>
                        <ImagePreview
                          // Fix: Check if 'img' is a String (URL) or File Object
                          src={
                            typeof img === "string"
                              ? img
                              : URL?.createObjectURL(img)
                          }
                          alt="Preview"
                        />
                      </Carousel.Card>
                    ))}
                  </Carousel.Track>
                  <Carousel.PrevBtn
                    style={{
                      backgroundColor: "var(--tertiary-color)",
                      borderRadius: "50%",
                    }}
                  />
                  <Carousel.NextBtn
                    style={{
                      backgroundColor: "var(--tertiary-color)",
                      borderRadius: "50%",
                    }}
                  />
                </Carousel>

                {isShowDeleteBtn && (
                  <ButtonEdit
                    type="button"
                    onClick={() => handleEditImageClick()}
                  >
                    <HiPencil />
                  </ButtonEdit>
                )}
              </ImageContainer>
            </FormGroup>
          </>
        )}

        <FormGroup>
          <Label>Text</Label>
          <Textarea
            id="content"
            name="text"
            placeholder="Body Text"
            rows="5"
            value={formData.text}
            onChange={handleChange}
          />
        </FormGroup>
        <ActionContainer>
          <ButtonIcon
            disabled={isLoadEditPost}
            action={() => console.log("edit")}
            style={{
              backgroundColor: "rgba(20, 108, 223, 0.904)",
              color: "white",
            }}
          >
            {isLoadEditPost ? <SpinnerMini /> : "Save"}
          </ButtonIcon>
          <ButtonIcon
            disabled={isLoadEditPost}
            action={() => console.log("cancel")}
            style={{
              backgroundColor: "rgba(223, 20, 20, 0.904)",
              color: "white",
            }}
          >
            Cancel
          </ButtonIcon>
        </ActionContainer>
      </FormContainer>
    </Layout>
  );
}

export default EditForm;

/* ---------- Styled Components ---------- */
/* (Keep all your existing styled components below here, unchanged) */
const ButtonAdd = styled.button`
  position: absolute;
  top: 4rem;
  right: 0.5rem;
  background-color: var(--hover-color);
  color: white;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    opacity: 0.8;
  }
`;
const ActionContainer = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
  gap: 0.5rem;
`;
// ... (rest of your styles)
const FileInput = styled.input`
  display: none;
`;
const Layout = styled.div`
  display: flex;
  justify-content: center;
`;
const FormContainer = styled.form`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 30rem;
  min-width: 40rem;
  max-width: 80rem;
  color: var(--text-color);
  @media (max-width: 1000px) {
    width: 100%;
  }
`;
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Label = styled.label`
  font-weight: 600;
`;
const Input = styled.input`
  background-color: inherit;
  color: var(--text-color);
  padding: 0.6rem 0.8rem;
  border-radius: 18px;
  border: 1px solid var(--tertiary-color);
  font-size: 1rem 1rem;
  height: 3rem;
  &:focus {
    border-color: var(--tertiary-color);
    outline: none;
  }
`;
const Textarea = styled.textarea`
  padding: 0.6rem 0.8rem;
  border-radius: 18px;
  background-color: inherit;
  color: var(--text-color);
  border: 1px solid var(--tertiary-color);
  font-size: 1rem;
  resize: vertical;
  &:focus {
    border-color: var(--tertiary-color);
    outline: none;
  }
`;
const ImageContainer = styled.div`
  position: relative;
  overflow-y: hidden;
  border: solid 1px var(--hover-color);
`;
const ImagePreview = styled.img`
  margin-top: 0.5rem;
  width: 100%;
  border-radius: 8px;
  object-fit: contain;
  height: 15rem;
`;
const ButtonEdit = styled.button`
  position: absolute;
  top: 1rem;
  right: 0.5rem;
  background-color: #2f2f31;
  color: white;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #444;
  }
`;
const ErrorMsg = styled.div`
  background: #ffe5e5;
  color: #b30000;
  padding: 0.6rem;
  border-radius: 5px;
  text-align: center;
  font-size: 0.9rem;
`;
