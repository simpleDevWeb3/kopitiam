import styled from "styled-components";
import CommunityTable from "./Features/Community/CommunityTable";

function ManageCommutiy() {
  return (
    <Container>
      <h2>Manage Community</h2>
      <CommunityTable />
    </Container>
  );
}

export default ManageCommutiy;
const Container = styled.div`
  max-width: 1000px;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  height: 100vh;
`;
