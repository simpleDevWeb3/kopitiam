import { AiFillPicture } from "react-icons/ai";
import { handleFileImgUpload, validImgFile } from "../helpers/formHelper";
import styled from "styled-components";
import { useState } from "react";
import { MdCancel } from "react-icons/md";

function UploadImg({ id, setPreview, onChange, fieldName, onError, label }) {
  const [imgUrl, setImgUrl] = useState("");
  function handleUpload(e) {
    {
      console.log("starting..");
      //1.validate
      const currentFile = e.target.files[0];
      const result = validImgFile(currentFile);
      console.log("result: ", result);
      if (!result.isValid) {
        console.log("run error;");
        onError?.(result.error);
      } else {
        handleFileImgUpload(e, setPreview, onChange, fieldName);
        setImgUrl(currentFile.name);
        onError?.(""); //clear prev error msg
      }
    }
  }
  return (
    <OptionGroup>
      <label style={{ flex: 1 }}>{label}</label>
      <UploadInput
        type="file"
        accept="image/*"
        id={id}
        onChange={handleUpload}
      />
      {imgUrl && <span> {imgUrl}</span>}
      <UploadLabel htmlFor={id}>
        {imgUrl ? "" : "Add"}
        {imgUrl ? <MdCancel /> : <AiFillPicture />}
      </UploadLabel>
    </OptionGroup>
  );
}

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
export default UploadImg;
