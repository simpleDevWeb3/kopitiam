import { useState } from "react";
import styled from "styled-components";
import Search from "../../components/Search";
import { Dropdown } from "../../components/Dropdown";
import { useOutsideClick } from "../../hook/useOutsideClick";
import { HiArrowDown } from "react-icons/hi2";
import { HiChevronDown } from "react-icons/hi";
import Filter from "../../components/Filter";
import { useSearchParams } from "react-router-dom";
import { BsTrashFill, BsUpload } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import ButtonIcon from "../../components/ButtonIcon";

function PostForm({ onSubmit }) {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "TEXT";
  const [displaySearch, setDisplaySearch] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isShowDeleteBtn, setShowDeleteBtn] = useState(false);
  const ref = useOutsideClick(closeSearchBar);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: null,
  });
  const [error, setError] = useState("");
  function closeSearchBar() {
    setDisplaySearch(false);
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      setError("Title and content are required");
      return;
    }

    setError("");
    if (onSubmit) onSubmit(formData);

    // Clear form after submission
    setFormData({
      title: "",
      content: "",
      category: "",
      image: null,
    });
  }

  const postOptions = [
    { key: "TEXT", label: "Text" },
    { key: "IMAGE", label: "Image" },
  ];
  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, image: file }));
      setIsDragging(false);
    }
  }
  function handleDragLeave(e) {
    e.preventDefault();
    setIsDragging(true);
  }
  function handleDragOver(e) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleMouseEnter() {
    setShowDeleteBtn(true);
  }

  function handleMouseLeave() {
    setShowDeleteBtn(false);
  }

  function handleCancelImage(e) {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, image: null }));
  }
  return (
    <Layout>
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

        {type === "IMAGE" && (
          <>
            <FormGroup>
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
                  <FileInput
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </>
              )}

              {formData.image && (
                <ImageContainer
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <ImagePreview
                    src={URL.createObjectURL(formData.image)}
                    alt="Preview"
                  />
                  {isShowDeleteBtn && (
                    <ButtonDelete onClick={(e) => handleCancelImage(e)}>
                      <FaTrash />
                    </ButtonDelete>
                  )}
                </ImageContainer>
              )}
            </FormGroup>
          </>
        )}

        <FormGroup>
          <Textarea
            id="content"
            name="content"
            placeholder="Body Text"
            rows="5"
            value={formData.content}
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
const ActionContainer = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
  gap: 0.5rem;
`;
const SearchBarContainer = styled.div`
  width: 30%;
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
`;
const ImagePreview = styled.img`
  margin-top: 0.5rem;
  width: 100%;
  border-radius: 8px;
  object-fit: contain;
  height: 15rem;
  border: solid 1px var(--hover-color);
`;

const ButtonDelete = styled.button`
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
