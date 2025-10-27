import { HiLink, HiUpload } from "react-icons/hi";
import Menus from "../Menus";
import ShareBtn from "../ShareBtn";
import styled from "styled-components";
function PostMenusShare({ variant, onClickShare, id }) {
  return (
    <>
      <Menus.MenuToggle id={`share-${id}`}>
        <ShareBtn variant={variant} onShare={() => onClickShare?.()} />
      </Menus.MenuToggle>

      <Menus.MenuList placement={"right"} id={`share-${id}`}>
        <Menus.MenuBtn>
          <HiLink />
          <BtnText>Copy Link</BtnText>
        </Menus.MenuBtn>
        <Menus.MenuBtn>
          <HiUpload />
          <BtnText>Repost</BtnText>
        </Menus.MenuBtn>
      </Menus.MenuList>
    </>
  );
}

const BtnText = styled.span`
  margin: 0.5rem;
`;

export default PostMenusShare;
