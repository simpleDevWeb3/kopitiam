import styled from "styled-components";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { FaUserTimes, FaExternalLinkAlt } from "react-icons/fa";

// Components
import Table from "../../components/Table";
import Menus from "../../components/Menus";
import ButtonIcon from "../../components/ButtonIcon";
import SpinnerMini from "../../components/SpinnerMini";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import SortBy from "../../components/SortBy";
import { Dropdown } from "../../components/Dropdown"; // Assuming you have this wrapper
import Status from "../../components/Status"; // Reuse your Status component

import { formatDate_DD_MM_YYY } from "../../helpers/dateHelper";
import { PAGE_SIZE } from "../../constant/FILE_CONFIG";
import { useModal } from "../../context/ModalContext";
import { useFetchMembers } from "../Dashboard/Features/Community/useFetchMembers";
import { useKickMember } from "../Dashboard/Features/Community/useKickMember";
import { kickMemberApi } from "../../services/CommunityApi";
import { useUser } from "../Auth/useUser";

function CommunityMembers() {
  const { user } = useUser();
  const { kickMember, isLoadKickMember, errorKickMember } = useKickMember();
  const { communityId } = useOutletContext();
  const {
    members: membersData,
    isLoadMembers,
    errorMembers,
  } = useFetchMembers(communityId);
  const [searchParam, setSearchParam] = useSearchParams();
  const { openModal } = useModal();

  // --- 1. DATA PREPARATION ---
  // The log shows members is an object { count: 3, members: [...] }
  // We need to safely access the array.
  const allMembers = membersData?.members || [];

  const [memberList, setMemberList] = useState([]);

  // Sync state when data loads
  useEffect(() => {
    if (allMembers) setMemberList(allMembers);
  }, [membersData?.members]);

  // --- 2. SEARCH LOGIC ---
  const handleSearch = function (query) {
    if (!query) return setMemberList(allMembers);

    // Reset to page 1 on search
    if (searchParam.get("page") !== "1") {
      searchParam.set("page", 1);
      setSearchParam(searchParam);
    }

    // Filter by User Name (nested in user object)
    const result = allMembers.filter((member) =>
      member.user?.name?.toLowerCase().includes(query.toLowerCase())
    );
    setMemberList(result);
  };

  // --- 3. SORT LOGIC ---
  const optionSort = [
    { value: "created_at-desc", label: "Joined (Newest first)" },
    { value: "created_at-asc", label: "Joined (Oldest first)" },
  ];

  const sortBy = searchParam.get("sortBy") || "created_at-desc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedMembers = [...memberList].sort((a, b) => {
    if (field === "created_at") {
      return (new Date(a[field]) - new Date(b[field])) * modifier;
    }
    // Fallback for other fields if you add them later
    return (a[field] - b[field]) * modifier;
  });

  // --- 4. PAGINATION LOGIC ---
  const page = Number(searchParam.get("page")) || 1;
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE;
  const sliceMembers = sortedMembers.slice(from, to);

  // --- HANDLERS ---
  const handleKickMember = (adminId, userId, communityId) => {
    //format data
    const data = { adminId, userId, communityId };
    kickMember(data);
  };

  if (isLoadMembers) return <SpinnerMini />;
  if (errorMembers) return <h2>Error loading members</h2>;

  return (
    <Container>
      <Header>
        <Dropdown>
          <div>
            <Search
              dropdown={false}
              onInput={handleSearch}
              placeholder="Search member..."
            />
          </div>
        </Dropdown>
        <OperationRow>
          <SortBy options={optionSort} />
        </OperationRow>
      </Header>

      <Table>
        <Table.Row style={{ backgroundColor: "var(--background-glass)" }}>
          <Table.Col>Member</Table.Col>
          <Table.Col>Status</Table.Col>
          <Table.Col>Email</Table.Col>
          <Table.Col>Joined Date</Table.Col>
          <Table.Col></Table.Col>
        </Table.Row>

        {sliceMembers.length === 0 && (
          <EmptyState>No members found.</EmptyState>
        )}

        {sliceMembers.map((member) => (
          <Table.Row key={member.user_id}>
            {/* 1. Name & Avatar */}
            <Table.Data>
              <UserInfo>
                {/* If you have an Avatar component, use it here */}
                <UserAvatar
                  src={member.user?.avatar_url || "default-avatar.png"}
                />
                <span>{member.user?.name || "Unknown User"}</span>
              </UserInfo>
            </Table.Data>

            {/* 2. Status */}
            <Table.Data>
              {/* Reusing your Status component logic */}
              <Status
                isBanned={false} // Assuming member status isn't "banned" in this table yet
                statusLabel={member.status}
                notBan={member.status}
              />
            </Table.Data>

            {/* 3. Email */}
            <Table.Data>{member.user?.email}</Table.Data>

            {/* 4. Joined At */}
            <Table.Data>{formatDate_DD_MM_YYY(member.created_at)}</Table.Data>

            {/* 5. Actions */}
            <Table.Data>
              <Menus.MenuToggle id={`member-${member.user_id}`}>
                <ButtonIcon
                  variant="text"
                  size="rounded"
                  icon={<HiDotsVertical />}
                />
              </Menus.MenuToggle>

              <Menus.MenuList id={`member-${member.user_id}`}>
                <Menus.MenuBtn
                  onClickAction={() => openModal("user-insight", member.user)}
                >
                  <MenuTxt>
                    <FaExternalLinkAlt />
                    <span>View Profile</span>
                  </MenuTxt>
                </Menus.MenuBtn>

                <Menus.MenuBtn
                  onClickAction={() =>
                    handleKickMember(user?.id, member.user_id, communityId)
                  }
                >
                  <MenuTxt $isDanger={true}>
                    <FaUserTimes />
                    <span>Kick Member</span>
                  </MenuTxt>
                </Menus.MenuBtn>
              </Menus.MenuList>
            </Table.Data>
          </Table.Row>
        ))}
      </Table>

      <Footer>
        <Pagination count={sortedMembers.length} />
      </Footer>
    </Container>
  );
}

// --- STYLES ---

const Container = styled.div`
  background-color: var(--background-glass);
  border-radius: 15px;
  padding: 1.5rem;
  width: 150%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  @media (max-width: 1380px) {
    width: 140%;
  }
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const OperationRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 500;
`;

const UserAvatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
  background-color: var(--tertiary-color);
`;

const MenuTxt = styled.div`
  margin: 0.5rem;
  display: flex;
  gap: 0.8rem;
  align-items: center;
  color: ${(props) => (props.$isDanger ? "var(--error-color)" : "inherit")};
`;

const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  color: var(--text-color-secondary);
`;

const Footer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`;

export default CommunityMembers;
