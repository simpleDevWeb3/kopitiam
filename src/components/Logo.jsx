import styled from "styled-components";
import { FaCoffee } from "react-icons/fa";
import { HiChatAlt2 } from "react-icons/hi";

function Logo() {
  return <Styledlogo>Kopitiam</Styledlogo>;
}
const Styledlogo = styled.h3`
  color: var(--text-color);
  @media (max-width: 368px) {
    display: none;
  }
`;
export default Logo;
