import { HiOutlineMenu } from "react-icons/hi";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";

import useSidebar from "../hook/useSidebar";

const StyledMenu = styled(HiOutlineMenu)`
  font-size: 1.9rem;
`;
function Menu() {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  console.log(isSidebarOpen, " ,Menu");
  return (
    <ButtonIcon
      type={"round"}
      icon={<StyledMenu />}
      action={() => toggleSidebar()}
    />
  );
}

export default Menu;
