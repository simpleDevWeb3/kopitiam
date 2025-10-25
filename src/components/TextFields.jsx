import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { BsFillSendFill, BsFillTrashFill } from "react-icons/bs";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border: solid 1px;
  border-radius: 25px;
  padding-bottom: 0.2rem;
  width: 100%;

  background-color: white;
`;
const Field = styled.textarea`
  padding-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
  min-height: 38px; /* Reddit-style starting height */
  max-height: 400px; /* max resize height */
  resize: vertical;

  border: 1px solid #ccc; /* subtle border */
  border-top-right-radius: 25px; /* rounded corners */
  border-top-left-radius: 25px; /* rounded corners */
  border: none;
  outline: none;
  font-size: 14px; /* Reddit-like font size */
  line-height: 1.4;
  box-sizing: border-box;

  &:focus {
    border-color: #0079d3; /* Reddit focus color */
  }
`;

const Features = styled.div`
  border-top: solid 1px rgba(0, 0, 0, 0.1);
  margin: 0.3rem;
  display: flex;
  justify-content: end;
  gap: 0.5rem;
  padding-top: 0.3rem;
`;
function TextFields() {
  return (
    <Container>
      <Field />
      <Features>
        <ButtonIcon variant="text" icon={<BsFillSendFill />}>
          Submit
        </ButtonIcon>
        <ButtonIcon variant="text" icon={<BsFillTrashFill />}>
          Cancel
        </ButtonIcon>
      </Features>
    </Container>
  );
}

export default TextFields;
