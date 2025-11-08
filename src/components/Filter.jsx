import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

function Filter({ filterField, options, startingOption }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type") || startingOption;
  function handleClick(val, e) {
    e.preventDefault();
    searchParams.set(filterField, val);
    setSearchParams(searchParams);
  }
  return (
    <StyledFilter>
      {options.map((option) => (
        <Option>
          <FilterButton onClick={(e) => handleClick(option.key, e)}>
            {option.label}
          </FilterButton>
          {type === option.key && <Underline />}
        </Option>
      ))}
    </StyledFilter>
  );
}

export default Filter;

const StyledFilter = styled.div`
  display: flex;
  gap: 1rem;
  color: var(--text-color);
`;
const Underline = styled.span`
  width: 100%;
  height: 0.2rem;
  background-color: #2b2be2;
  border-radius: 25px;
  animation-name: growLeftRight;
  animation-duration: 0.15s;
  @keyframes growLeftRight {
    0% {
      width: 0%;
    }

    90% {
      width: 90%;
    }

    100% {
      width: 100%;
    }
  }
`;
const Option = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const FilterButton = styled.button`
  border: none;
  background-color: inherit;
  color: var(--text-color);
`;
