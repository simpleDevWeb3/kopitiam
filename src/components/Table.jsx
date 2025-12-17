import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;

  /* CRITICAL CHANGES FOR BORDER RADIUS: */
  border-collapse: separate; /* 1. Must be separate, not collapse */
  border-spacing: 0; /* 2. Removes space between cells */
  border-radius: 8px; /* 3. Apply the radius */
  overflow: hidden; /* 4. Clips the child elements to the radius */

  /* Move the outer border here so it curves with the radius */
  border: 1px solid var(--hover-color);

  background: var(--background-glass);
`;

const StyledTbody = styled.tbody`
  /* Border removed from here, as it is now on the Table */
`;
const StyledRow = styled.tr`
  /* With 'border-collapse: separate', we must put the border on the 
     children (td and th), not the tr itself.
  */

  & th,
  & td {
    border-bottom: 1px solid var(--hover-color);
  }

  /* Remove the bottom border from the very last row's cells 
     to avoid a double border with the table edge */
  &:last-child th,
  &:last-child td {
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
  text-align: "center";
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

function Row({ children, style }) {
  return <StyledRow style={style}>{children}</StyledRow>;
}

function Data({ children }) {
  return <StyledData>{children}</StyledData>;
}

Table.Col = Column;
Table.Row = Row;
Table.Data = Data;

export default Table;
