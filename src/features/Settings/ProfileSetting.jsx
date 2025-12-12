import styled from "styled-components";
import Input from "../../components/Input";
import { useUser } from "../Auth/useUser";
import { HiMiniPencilSquare } from "react-icons/hi2";
import ButtonIcon from "../../components/ButtonIcon";
import UserCard from "../../components/UserCard";
import { useModal } from "../../context/ModalContext";

function ProfileSetting() {
  const { user } = useUser();
  const { openModal } = useModal();

  return (
    <StyledContainer>
      <UserCard />
      <Input viewOnly={true} initialValue={user.name} key={user.name}>
        username
      </Input>
      <Input viewOnly={true} initialValue={user.bio} key={user.bio}>
        description
      </Input>
      <BtnContainer>
        <ButtonIcon
          action={() => openModal("Setting_Profile", user)}
          icon={<Edit />}
        >
          {" "}
          Edit
        </ButtonIcon>
      </BtnContainer>
    </StyledContainer>
  );
}
const StyledContainer = styled.div`
  margin-top: 1rem;
  max-width: 50rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: end;
`;
const Edit = styled(HiMiniPencilSquare)`
  pointer-events: auto !important;
  cursor: pointer;

  font-size: 1.5rem;
`;
export default ProfileSetting;
