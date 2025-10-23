import styled from "styled-components";
import { FaCoffee } from "react-icons/fa";
import { HiChatAlt2 } from "react-icons/hi";

// Main logo container
const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  text-align: center;

  font-size: 1.5rem;
  font-weight: 600;
  color: #6f4e37;

  user-select: none;
  width: 100%;
  height: 100%;

  @media (max-width: 1000px) {
    display: none;
  }
  @media (max-width: 480px) {
    display: none;
  }
`;

// Icon stack (chat + coffee overlay)
const IconStack = styled.div`
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.4rem;
  margin-left: 0.2rem;
`;

// Chat bubble icon (background)
const ChatIcon = styled(HiChatAlt2)`
  position: absolute;
  bottom: 0.7rem;
  left: 0.4rem;
  font-size: 2.5rem;
`;

// Coffee icon (foreground)
const CoffeeIcon = styled(FaCoffee)`
  position: absolute;
  bottom: 0;
  left: 0rem;
  font-size: 1.6rem;
`;

const IconText = styled.span`
  margin-bottom: 0.4rem;
`;

function Logo() {
  return (
    <StyledLogo>
      <IconStack>
        <ChatIcon />
        <CoffeeIcon />
      </IconStack>
      <IconText>Kopitiam</IconText>
    </StyledLogo>
  );
}

export default Logo;
