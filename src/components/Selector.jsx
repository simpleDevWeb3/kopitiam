/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import styled from "styled-components";
import { IoIosCloseCircle } from "react-icons/io";
import ButtonIcon from "./ButtonIcon";

// ---------- CONTEXT ----------
const SelectorContext = createContext();

function Selector({ children, limit = 3 }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [labelMap, setLabelMap] = useState({}); // for mapping values → labels
  const isExceeded = selectedItems.length >= limit;

  function handleSelect(value, label, onChange) {
    const isSelected = selectedItems.includes(value);

    if (isSelected) {
      setSelectedItems((prev) => prev.filter((item) => item !== value));
      onChange(selectedItems.filter((item) => item !== value));
      return;
    }
    if (limit > 0 && isExceeded) return;

    // store mapping so we can show selected labels later
    setLabelMap((prev) => ({ ...prev, [value]: label }));
    setSelectedItems((prev) => [...prev, value]);
    onChange([...selectedItems, value]);
  }

  const value = {
    selectedItems,
    handleSelect,
    labelMap,
    limit,
    isExceeded,
  };

  return (
    <SelectorContext.Provider value={value}>
      {children}
    </SelectorContext.Provider>
  );
}

export function useSelector() {
  const ctx = useContext(SelectorContext);
  if (!ctx)
    throw new Error("useSelector must be used inside a <Selector> component");
  return ctx;
}

// ---------- SUBCOMPONENTS ----------
function Group({ title, children }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      {title && <h3 style={{ marginBottom: "0.5rem" }}>{title}</h3>}
      <ContainerSelector>{children}</ContainerSelector>
    </div>
  );
}

function Option({ value, children, onChange }) {
  const { selectedItems, handleSelect, limit } = useSelector();
  const isSelected = selectedItems.includes(value);
  const isLimitReached = selectedItems.length >= limit && !isSelected;

  return (
    <ButtonIconStyled
      $selected={isSelected}
      disabled={isLimitReached}
      onClick={() => {
        handleSelect(value, children, onChange);
      }}
      size="small"
    >
      {children}
      {isSelected && <CloseIcon />}
    </ButtonIconStyled>
  );
}

//  Count Component
function Count() {
  const { selectedItems, limit } = useSelector();
  return <span>{limit > 0 && `${selectedItems.length}/${limit}`}</span>;
}

// Selected Labels Component
function Selected() {
  const { selectedItems, labelMap, handleSelect } = useSelector();
  if (selectedItems.length === 0)
    return <p style={{ opacity: 0.6 }}>No topics selected yet.</p>;

  return (
    <SelectedList>
      {selectedItems.map((value) => (
        <SelectedItem
          onClick={() => handleSelect(value, labelMap[value])}
          key={value}
        >
          {labelMap[value]}
        </SelectedItem>
      ))}
    </SelectedList>
  );
}

// ---------- STYLES ----------
const ContainerSelector = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const ButtonIconStyled = styled.span`
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${({ $selected }) =>
    $selected ? "#007bff" : "var(--hover-color)"};
  color: ${({ $selected }) => ($selected ? "white  !important" : "inherit")};
  transition: all 0.15s ease;
  font-weight: 600;
`;

const SelectedList = styled.div`
  max-width: 50rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0.8rem 0;
`;
const CloseIcon = styled(IoIosCloseCircle)`
  color: var(--tertiary-color);
`;
const SelectedItem = styled.span`
  border: 1px solid var(--tertiary-color);

  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;

  cursor: pointer;
  &:hover {
    text-decoration: line-through;
  }

  transition: all 0.15s ease;
`;

// Attach subcomponents
Selector.Group = Group;
Selector.Option = Option;
Selector.Count = Count;
Selector.Selected = Selected;

export { Selector };
