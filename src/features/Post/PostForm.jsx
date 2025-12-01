import styled from "styled-components";
import Search from "../../components/Search";
import { Dropdown } from "../../components/Dropdown";

import { HiArrowDown } from "react-icons/hi2";
import { HiChevronDown, HiPencil } from "react-icons/hi";
import Filter from "../../components/Filter";

import { BsTrashFill, BsUpload } from "react-icons/bs";
import { FaPlus, FaTrash } from "react-icons/fa";
import ButtonIcon from "../../components/ButtonIcon";
import { usePostForm } from "./usePostForm";
import { useModal } from "../../context/ModalContext";
import { Selector } from "../../components/Selector";
import Modal from "../../components/Modal";
import SelectTopic from "../../components/SelectTopic";
import { useRef, useState } from "react";
import { useUser } from "../Auth/useUser";
import { useCreatePost } from "./useCreatePost";
import Spinner from "../../components/Spinner";
import Carousel from "../../components/Carousel";

function PostForm() {
  const { openModal, closeModal } = useModal();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const { user } = useUser();
  const { createPost, isLoadCreatePost, errorCreatePost } = useCreatePost();
  const fileInputRef = useRef(null);
  const {
    type,
    formData,
    error,
    displaySearch,
    setDisplaySearch,
    isDragging,
    isShowDeleteBtn,
    ref,
    postOptions,
    handleChange,
    handleImageChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleMouseEnter,
    handleMouseLeave,
    handleCancelImage,
    handleSubmit,
  } = usePostForm(handleFinalSubmit);

  // 1. Create a wrapper function to merge data
  function handleFinalSubmit(formDataFromHook) {
    if (!selectedTopic) {
      alert("Please select a topic!");
      return;
    }

    const finalData = {
      ...formDataFromHook,
      topic_id: selectedTopic.id,
      user_id: user.id,
    };
    //call api here!
    console.log(finalData);

    setSelectedTopic(null);

    createPost(finalData);
  }

  function onAdd(topic) {
    setSelectedTopic(topic);
    closeModal();
  }

  function onCancel() {
    closeModal();
  }

  return (
    <Layout>
      {isLoadCreatePost && <Spinner />}
      {errorCreatePost && <div>{errorCreatePost}</div>}
      <Selector>
        <Modal id={"Select Topic"}>
          <SelectTopic
            selectedTopic={selectedTopic}
            onAdd={onAdd}
            onCancel={onCancel}
          />
        </Modal>
      </Selector>
      <FormContainer onSubmit={handleSubmit}>
        <Title>Create a Post</Title>

        {error && <ErrorMsg>{error}</ErrorMsg>}
        <FormGroup>
          {displaySearch ? (
            <Dropdown position="left">
              <SearchBarContainer ref={ref}>
                <Search />
              </SearchBarContainer>
            </Dropdown>
          ) : (
            <SelectCommunity onClick={() => setDisplaySearch((show) => !show)}>
              Select Community
              <HiChevronDown />
            </SelectCommunity>
          )}
        </FormGroup>
        <Filter
          filterField="type"
          options={postOptions}
          startingOption="TEXT"
        />
        <FormGroup>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />
        </FormGroup>
        <ActionContainer
          style={{ justifyContent: "start", alignItems: "center" }}
        >
          {selectedTopic && (
            <SelectedTopicLabel>{selectedTopic?.label}</SelectedTopicLabel>
          )}
          <ButtonIcon
            size={selectedTopic && "rounded"}
            type="button"
            action={() => openModal("Select Topic")}
          >
            {selectedTopic ? <HiPencil /> : " Select Topic"}
          </ButtonIcon>
        </ActionContainer>

        {type === "IMAGE" && (
          <>
            <FormGroup>
              <FileInput
                ref={fileInputRef}
                type="file"
                multiple
                id="image"
                accept="image/*"
                onChange={handleImageChange}
              />
              {!formData.image && (
                <>
                  <FileLabel
                    onDragOver={(e) => handleDragOver(e)}
                    onDragLeave={(e) => handleDragLeave(e)}
                    onDrop={(e) => handleDrop(e)}
                    htmlFor="image"
                  >
                    {isDragging ? "Drop Image Here" : "Drag and Drop Image"}
                    <BsUpload />
                  </FileLabel>
                </>
              )}

              {formData.image && (
                <ImageContainer
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {formData.image.length > 0 && (
                    <Carousel
                      scrollLastAuto={true}
                      total={formData.image.length}
                      hideWhenCurrentSlide={true}
                    >
                      <Carousel.Count />
                      <Carousel.Track>
                        {formData.image.map((img) => (
                          <Carousel.Card>
                            <ImagePreview
                              src={URL?.createObjectURL(img)}
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
                  )}

                  {isShowDeleteBtn && (
                    <>
                      <ButtonDelete onClick={(e) => handleCancelImage(e)}>
                        <FaTrash />
                      </ButtonDelete>

                      <ButtonAdd
                        onClick={(e) => {
                          e.preventDefault();
                          fileInputRef.current.click();
                        }}
                      >
                        <FaPlus />
                      </ButtonAdd>
                    </>
                  )}
                </ImageContainer>
              )}
            </FormGroup>
          </>
        )}

        <FormGroup>
          <Textarea
            id="text"
            name="text"
            placeholder="Body Text"
            rows="5"
            value={formData.text}
            onChange={handleChange}
          />
        </FormGroup>
        <ActionContainer>
          <ButtonIcon>Post</ButtonIcon>

          <ButtonIcon>Save as Draft</ButtonIcon>
        </ActionContainer>
      </FormContainer>
    </Layout>
  );
}

export default PostForm;

/* ---------- Styled Components ---------- */
const SelectedTopicLabel = styled.div`
  border-radius: 25px;
  background-color: rgb(19, 87, 184);
  padding: 0.5rem 1rem;
  color: white;
`;
const ActionContainer = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
  gap: 0.5rem;
`;
const SearchBarContainer = styled.div`
  width: 50%;
  @media (max-width: 1000px) {
    width: 70%;
  }
`;
const FileInput = styled.input`
  display: none;
`;
const FileLabel = styled.label`
  display: flex;
  background-color: inherit;

  padding: 0.6rem 1rem;

  border-radius: 20px;
  cursor: pointer;

  border: 1px dashed #ccc;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s ease;
  text-align: center;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 10rem;
  &:hover {
    background-color: var(--hover-color, #d6d6d6);
  }
`;

const SelectCommunity = styled.div`
  border-radius: 25px;
  border: 1px solid var(--hover-color);
  width: 16rem;
  padding: 0.7rem 1rem;
  background-color: var(--hover-color);
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  justify-content: space-between;
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
  width: 60%;
  max-width: 50rem;
  color: var(--text-color);

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const Title = styled.h2`
  color: var(--text-color, #333);
`;
const ContainerSearch = styled.div`
  display: flex;
  justify-content: start;
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

const Select = styled.select`
  padding: 0.6rem 0.9rem;
  border-radius: 25px;
  border: 1px solid #ccc;
  font-size: 1rem;
  width: 15rem;
  &:focus {
    border-color: var(--primary-color, #6f4e37);
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

const ButtonDelete = styled.button`
  position: absolute;
  top: 1rem;
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

const ErrorMsg = styled.div`
  background: #ffe5e5;
  color: #b30000;
  padding: 0.6rem;
  border-radius: 5px;
  text-align: center;
  font-size: 0.9rem;
`;
