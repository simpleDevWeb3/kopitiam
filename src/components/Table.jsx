import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: var(--background-color);
`;

const StyledTbody = styled.tbody`
  border: solid 1px var(--hover-color);
`;

const StyledRow = styled.tr`
  border-bottom: 1px solid var(--hover-color);

  &:last-child {
    border-bottom: none;
  }
`;

const StyledCol = styled.th`
  text-align: left;
  padding: 12px 16px;
  background: inherit;
  font-weight: 600;

`;

const StyledData = styled.td`
  padding: 12px 16px;


`;

function Table({ children }) {
  return (
    <StyledTable>
      <StyledTbody>{children}</StyledTbody>
    </StyledTable>
  );
}

function Column({ children }) {
  return <StyledCol>{children}</StyledCol>;
}

function Row({ children }) {
  return <StyledRow>{children}</StyledRow>;
}

function Data({ children }) {
  return <StyledData>{children}</StyledData>;
}

Table.Col = Column;
Table.Row = Row;
Table.Data = Data;

export default Table;
