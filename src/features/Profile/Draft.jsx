import { BiTrashAlt } from "react-icons/bi";
import { HiPencil } from "react-icons/hi2";
import styled from "styled-components";
import ButtonIcon from "../../components/ButtonIcon";

function Draft() {
  return (
    <StyledContainer>
      {Array.from({ length: 5 }).map((_, i) => (
        <DraftItem />
      ))}
    </StyledContainer>
  );
}

export default Draft;
const StyledContainer = styled.div`
  height: 100vh;
`;

function DraftItem() {
  return (
    <div
      style={{
        padding: "1rem",
        borderBottom: "solid 1px var(--hover-color)",
      }}
    >
      <p>King og </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p>Edited 1 Minute Ago</p>
        <div style={{ display: "flex", gap: "0.6rem" }}>
          <ButtonIcon variant="text" size="rounded">
            <HiPencil />
          </ButtonIcon>
          <ButtonIcon variant="text" size="rounded">
            <BiTrashAlt />
          </ButtonIcon>
        </div>
      </div>
    </div>
  );
}
