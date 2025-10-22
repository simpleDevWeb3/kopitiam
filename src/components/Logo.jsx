import styled from "styled-components";
import { FaCoffee } from "react-icons/fa";
import { HiChatAlt2 } from "react-icons/hi";

// Main logo container
const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  gap: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #6f4e37;
  margin-top: 1.5rem;
  user-select: none;
`;

// Icon stack (chat + coffee overlay)
const IconStack = styled.div`
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
`;

// Chat bubble icon (background)
const ChatIcon = styled(HiChatAlt2)`
  position: absolute;
  bottom: 1.2rem;
  left: 1.2rem;
  font-size: 2.5rem;
`;

// Coffee icon (foreground)
const CoffeeIcon = styled(FaCoffee)`
  position: absolute;
  bottom: 0.5rem;
  right: 0.1rem;
  font-size: 1.6rem;
`;

const IconText = styled.span`
  margin-bottom: 1rem;
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
