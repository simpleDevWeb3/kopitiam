import styled from "styled-components";
import forumData from "../../data/post";

import UserTable from "./Features/Users/UserTable";

function ManageUser() {
  const { users } = forumData;
  console.log(users);
  return (
    <Container>
      <h2>All User</h2>
      <br />
      <UserTable />
    </Container>
  );
}

export default ManageUser;
const Container = styled.div`
  max-width: 1000px;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  height: 100vh;
`;
