import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { BsFillSendFill, BsFillTrashFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { useFieldText } from "../hook/useFieldText";

function TextFields() {
  const [text, setText] = useState("");
  const { toggleTextField } = useFieldText();

  const fieldRef = useRef();
  function handleInput(e) {
    setText(e.currentTarget.textContent);
  }
  function handlePost() {
    console.log(text);
    if (!text) return;
    toggleTextField(null);
  }

  function handleCancel() {
    setText("");
    if (fieldRef.current) fieldRef.current.textContent = "";
  }
  return (
    <Container>
      <Field
        ref={fieldRef}
        contentEditable
        suppressContentEditableWarning={true}
        onInput={(e) => handleInput(e)}
      />

      <Features>
        <ButtonIcon
          action={handlePost}
          size="small"
          variant="text"
          icon={<BsFillSendFill />}
        >
          Submit
        </ButtonIcon>
        <ButtonIcon
          action={handleCancel}
          size="small"
          variant="text"
          icon={<BsFillTrashFill />}
        >
          Cancel
        </ButtonIcon>
      </Features>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border: solid 1px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding-bottom: 0.2rem;
  width: 100%;

  background-color: white;
`;
const Field = styled.p.attrs({ contentEditable: true })`
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1rem; /* no vertical padding */
  width: 100%;
  min-height: 38px; /* Reddit-style starting height */
  max-height: 400px; /* max resize height */
  resize: vertical;
  margin: 0px;
  border: 1px solid #ccc; /* subtle border */
  border: none;
  outline: none;
  font-size: 14px; /* Reddit-like font size */
  line-height: 1.4;
  box-sizing: border-box;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  cursor: text;
  &:focus {
    border-color: #0079d3; /* Reddit focus color */
  }
`;

const Features = styled.div`
  border-top: solid 1px rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: end;
  gap: 0.5rem;
  padding-top: 0.3rem;
  padding-right: 0.5rem;
`;

export default TextFields;
