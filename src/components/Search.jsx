import styled from "styled-components";
import { HiOutlineSearch } from "react-icons/hi";

const StyledSearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--background-color);
  border-radius: 25px;
  border: 1px solid #ccc;
  padding: 0.3rem 1rem;
  width: fit-content;
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border: none;
  background: transparent;
  font-size: 1rem;
  outline: none;
  width: 36rem;
  color: var(--primary-color);
`;

const SearchIcon = styled(HiOutlineSearch)`
  font-size: 1.5rem;
  color: var(--primary-color);
`;

function Search() {
  return (
    <StyledSearchBar>
      <SearchIcon />
      <StyledInput type="text" placeholder="Search" />
    </StyledSearchBar>
  );
}

export default Search;
