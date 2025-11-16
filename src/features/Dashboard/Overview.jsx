import styled from "styled-components";

function Overview() {
  return (
    <Container>
      <h1>Overview</h1>
    </Container>
  );
}

export default Overview;
const Container = styled.div`
  max-width: 1000px;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  height: 100vh;
`;
