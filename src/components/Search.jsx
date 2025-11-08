import styled from "styled-components";
import { HiOutlineSearch } from "react-icons/hi";
import { Dropdown, useDropdown } from "./Dropdown";


const StyledSearchBar = styled.div`
  background-color: var(--tertiary-color);
  border-radius: 25px;
  border: 1px solid #ccc;
  padding: 0.2rem 1rem;
  max-height: 2.8rem;

  width: 100%;
  text-align: center;
  margin-right: 1rem;
  position: relative;

  @media (max-width: 1300px) {
    flex: 1;
  }

  &:active {
    outline: blue 1px;
  }
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: none;
  background: transparent;
  font-size: 0.9rem;
  outline: none;
  width: 100%;
  color: var(--primary-color);

  &::placeholder {
  }
`;

const SearchIcon = styled(HiOutlineSearch)`
  font-size: 1rem;
  color: var(--primary-color);
`;

const Layout = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

function Search() {
  const { open } = useDropdown();

  return (
    <StyledSearchBar>
      <Dropdown.Trigger>
        <Layout>
          <SearchIcon />
          <StyledInput
            type="text"
            placeholder="search post"
            onChange={() => {
              open();
            }}
          />
        </Layout>
      </Dropdown.Trigger>

      {/* Dropdown suggestion list */}
      <Dropdown.List>
        <Dropdown.Item>Latte Recipes</Dropdown.Item>
        <Dropdown.Item>Coffee Beans</Dropdown.Item>
        <Dropdown.Item>Nearby Cafes</Dropdown.Item>
        <Dropdown.Item>Equipment Reviews</Dropdown.Item>
      </Dropdown.List>
    </StyledSearchBar>
  );
}

export default Search;
