import styled from "styled-components";
import Table from "../../../../components/Table";
import Menus from "../../../../components/Menus";
import ButtonIcon from "../../../../components/ButtonIcon";
import { HiDotsVertical } from "react-icons/hi";
import { FaBan, FaTrash } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import Spinner from "../../../../components/Spinner";
import Avatar from "../../../../components/Avatar";
import { useUser } from "../../../Auth/useUser";
import { formatDate_DD_MM_YYY } from "../../../../helpers/dateHelper";
import Pagination from "../../../../components/Pagination";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../../constant/FILE_CONFIG";
import { useFetchCommunityAdmin } from "./useFetchCommunityAdmin";
import { useEffect, useRef, useState } from "react";
import Filter from "../../../../components/Filter";
import Status from "../../../../components/Status";
import Search from "../../../../components/Search";
import { Dropdown } from "../../../../components/Dropdown";
import SortBy from "../../../../components/SortBy";
import { useBanCommunity } from "./useBanCommunity";
import { useModal } from "../../../../context/ModalContext";
import { useUnbanCommunity } from "./useUnbanCommunity";

function CommunityTable() {
  const { openModal } = useModal();

  const [searchParam, setSearchParam] = useSearchParams();
  const page = searchParam.get("page") ? Number(searchParam.get("page")) : 1;
  const { user } = useUser();
  const { unbanCommunity, isLoadUnbanCommunity, errorUnbanCommunity } =
    useUnbanCommunity();

  // --- DATA FETCHING ---
  const { community, isLoadCommunity } = useFetchCommunityAdmin(user?.id);
  const allCommunities = community?.communities || [];

  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const filterVal = searchParam.get("type") || "All";

  // --- EFFECT 1: Reset Page on Filter Change ---
  // If user switches from "All" to "Banned", go back to page 1
  const filterRef = useRef(filterVal);
  useEffect(() => {
    if (filterRef.current !== filterVal) {
      if (page > 1) {
        searchParam.set("page", 1);
        setSearchParam(searchParam);
      }
      filterRef.current = filterVal;
    }
  }, [filterVal, page, searchParam, setSearchParam]);

  const searchRef = useRef(searchQuery);
  useEffect(() => {
    if (searchRef.current !== searchQuery) {
      if (page > 1) {
        searchParam.set("page", 1);
        setSearchParam(searchParam);
      }
    }
  }, [searchQuery, searchParam, setSearchParam, page]);

  // --- FILTERING LOGIC (The "Engine") ---
  const filteredCommunity = allCommunities.filter((item) => {
    // 1. Check Search Query
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    // 2. Check Filter Tabs
    if (filterVal === "All") return true;
    switch (filterVal) {
      case "BANNED":
        return item.isBanned === true;
      case "PUBLIC":
        return item.isBanned === false;
      default:
        return true;
    }
  });

  const optionSort = [
    { value: "createdAt-desc", label: "Date (Newest first)" },
    { value: "createdAt-asc", label: "Date (Oldest first)" },

    { value: "memberCount-desc", label: "Most Joined" },
    { value: "memberCount-asc", label: "Least Joined" },
  ];

  // 1. Get the sort value from URL (default to Newest)
  const sortBy = searchParam.get("sortBy") || "created_at-desc";

  // 2. Split the value "created_at-desc" into ["created_at", "desc"]
  const [field, direction] = sortBy.split("-");

  // 3. Determine modifier: 1 for ascending, -1 for descending
  const modifier = direction === "asc" ? 1 : -1;

  // 4. Create the sorted list
  // IMPORTANT: Use [...filteredPosts] to create a copy.
  // Never use .sort() directly on state (postList) because it mutates the data.
  const sortedCommunity = [...filteredCommunity].sort((a, b) => {
    // A. Handle Date Sorting
    if (field === "createdAt") {
      return (new Date(a[field]) - new Date(b[field])) * modifier;
    }

    // B. Handle Number Sorting (Upvotes/Downvotes)
    // We default to 0 to prevent errors if a post has no votes yet

    const valA = a[field] || 0;
    const valB = b[field] || 0;

    return (valA - valB) * modifier;
  });

  // --- PAGINATION ---
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE;
  const sliceCommunities = sortedCommunity.slice(from, to);

  // --- HANDLER ---
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // --- RENDER ---
  if (isLoadCommunity) return <Spinner />;

  return (
    <StyledContainer>
      <Header>
        <Dropdown>
          <div>
            <Search dropdown={false} onInput={handleSearch} />
          </div>
        </Dropdown>
        <OperationRow>
          <Filter
            filterField="type"
            options={[
              { key: "All", label: "All" },
              { key: "BANNED", label: "Banned" },
              { key: "PUBLIC", label: "Public" },
            ]}
            startingOption={"All"}
            variant={"tabs"}
          />
          <SortBy options={optionSort} />
        </OperationRow>
      </Header>

      <Table>
        <Table.Row style={{ backgroundColor: "var(--background-color)" }}>
          <Table.Col>Name</Table.Col>
          <Table.Col>Status</Table.Col>
          <Table.Col>MemberCount</Table.Col>
          <Table.Col>Created At</Table.Col>
          <Table.Col />
        </Table.Row>

        {sliceCommunities.map((item) => (
          <Table.Row key={item.id}>
            <Table.Data>{item.name}</Table.Data>
            <Table.Data>
              <Status isBanned={item.isBanned} />
            </Table.Data>
            <Table.Data>{item.memberCount}</Table.Data>
            <Table.Data>{formatDate_DD_MM_YYY(item.createdAt)}</Table.Data>
            <Table.Data>
              <Menus.MenuToggle id={`community-${item.id}`}>
                <ButtonIcon
                  variant="text"
                  size="rounded"
                  icon={<HiDotsVertical />}
                />
              </Menus.MenuToggle>
              <Menus.MenuList id={`community-${item.id}`}>
                <Menus.MenuBtn
                  onClickAction={() => openModal("community-insight", item)}
                >
                  <MenuTxt>
                    <ImProfile />
                    <span>insight</span>
                  </MenuTxt>
                </Menus.MenuBtn>
                <Menus.MenuBtn
                  onClickAction={() =>
                    item.isBanned
                      ? unbanCommunity({
                          communityId: item?.id,
                          adminId: user?.id,
                        })
                      : openModal("ban-community", item)
                  }
                >
                  <MenuTxt>
                    <FaBan />
                    <span>{item.isBanned ? "Unban" : "Ban"}</span>
                  </MenuTxt>
                </Menus.MenuBtn>
              </Menus.MenuList>
            </Table.Data>
          </Table.Row>
        ))}
      </Table>
      <br />
      <Pagination count={filteredCommunity.length} />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  margin-bottom: 5rem;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
const OperationRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;
const MenuTxt = styled.div`
  margin: 0.5rem;
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;

export default CommunityTable;
