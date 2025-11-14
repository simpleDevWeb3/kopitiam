import styled from "styled-components";
import Table from "../../../../components/Table";
import forumData from "../../../../data/post";
import Menus from "../../../../components/Menus";
import ButtonIcon from "../../../../components/ButtonIcon";
import { HiDotsVertical } from "react-icons/hi";

import { FaBan, FaTrash } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

function UserTable() {
  const { users } = forumData;
  console.log(users);
  return (
    <Table>
      <Table.Row>
        <Table.Col>Avatar</Table.Col>
        <Table.Col>Username</Table.Col>
        <Table.Col>Email</Table.Col>
        <Table.Col>Joined At</Table.Col>
        <Table.Col>Status</Table.Col>
      </Table.Row>

      {users.map((user) => (
        <Table.Row key={user.id}>
          <Table.Data>{user.avatar}</Table.Data>
          <Table.Data>{user.username}</Table.Data>
          <Table.Data>{user.email}</Table.Data>
          <Table.Data>{user.joinedAt}</Table.Data>
          <Table.Data>Online</Table.Data>
          <Table.Data>
            <Menus.MenuToggle id={`user-${user.id}`}>
              <ButtonIcon
                variant="text"
                size="rounded"
                icon={<HiDotsVertical />}
              />
            </Menus.MenuToggle>
            <Menus.MenuList id={`user-${user.id}`}>
              <Menus.MenuBtn>
                <MenuTxt>
                  <ImProfile />
                  <span>insight</span>
                </MenuTxt>
              </Menus.MenuBtn>
              <Menus.MenuBtn>
                <MenuTxt>
                  <FaBan />
                  <span>Ban</span>
                </MenuTxt>
              </Menus.MenuBtn>
              <Menus.MenuBtn>
                <MenuTxt>
                  <FaTrash />
                  <span>Delete</span>
                </MenuTxt>
              </Menus.MenuBtn>
            </Menus.MenuList>
          </Table.Data>
        </Table.Row>
      ))}
    </Table>
  );
}

const MenuTxt = styled.div`
  margin: 0.5rem;
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;

export default UserTable;
