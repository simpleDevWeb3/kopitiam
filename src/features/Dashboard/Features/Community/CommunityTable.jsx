import styled from "styled-components";
import Table from "../../../../components/Table";
import forumData from "../../../../data/post";
import Menus from "../../../../components/Menus";
import ButtonIcon from "../../../../components/ButtonIcon";
import { HiDotsVertical } from "react-icons/hi";

import { FaBan, FaTrash } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

function CommunityTable() {
  const { communities } = forumData;

  return (
    <Table>
      <Table.Row>
        <Table.Col>Icon</Table.Col>
        <Table.Col>Name</Table.Col>
        <Table.Col>Member Number</Table.Col>
        <Table.Col>Admin</Table.Col>
        <Table.Col>Created At</Table.Col>
      </Table.Row>

      {communities.map((community) => (
        <Table.Row key={community.id}>
          <Table.Data>{community.icon}</Table.Data>
          <Table.Data>{community.name}</Table.Data>
          <Table.Data>{community.members}</Table.Data>
          <Table.Data>Admin</Table.Data>
          <Table.Data>{community.createdAt}</Table.Data>
          <Table.Data>
            <Menus.MenuToggle id={`community-${community.id}`}>
              <ButtonIcon
                variant="text"
                size="rounded"
                icon={<HiDotsVertical />}
              />
            </Menus.MenuToggle>
            <Menus.MenuList id={`community-${community.id}`}>
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

export default CommunityTable;
