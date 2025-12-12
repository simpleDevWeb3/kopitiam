import styled from "styled-components";
import useSidebar from "../hook/useSidebar";
import { useScrollRestore } from "../hook/useScrollRestore";
import Avatar from "../components/Avatar";
import Tabs from "../components/Tabs";
import { Outlet, useParams } from "react-router-dom";
import { useUser } from "../features/Auth/useUser";
import { useFetchUser } from "../features/Users/useFetchUser";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";
import ConfirmDelete from "../components/ConfirmDelete";

function ProfilePage() {
  const { userId } = useParams();

  const { userById, isLoadUser, errorUser } = useFetchUser(userId);
  const { $isSidebarOpen } = useSidebar();
  const { user } = useUser();
  const basePath = `/profile/${userId}`;
  const isOwnedAcc = userId === user?.id;
  const encodedBannerUrl = userById?.banner_url
    ? encodeURI(userById?.banner_url)
    : null;
  useScrollRestore();
  const links = [
    { key: "POST", label: "Post", index: true },
    { key: "COMMENTED", label: "Commented" },

    { key: "UPVOTED", label: "Upvoted" },
    { key: "DOWNVOTED", label: "Downvoted" },
  ];
  if (isLoadUser) return <Spinner />;
  console.log("own: ", isOwnedAcc, " ", userId, user?.id);
  return (
    <PageContainer $isSidebarOpen={$isSidebarOpen}>
      <ProfileHeader>
        <Banner $image={encodedBannerUrl}>
          <AvatarContainer>
            <Avatar src={userById?.avatar_url} />
          </AvatarContainer>
        </Banner>
        <div style={{ display: "flex", gap: "1rem" }}>
          <ReservedEl />
          <InfoContainer>
            <div>
              <UsernameBig>{userById?.name}</UsernameBig>
              <UsernameSmall>@{userById?.name}</UsernameSmall>
            </div>
          </InfoContainer>
        </div>
      </ProfileHeader>
      <OperationContainer>
        <Tabs links={links} basePath={basePath} />
      </OperationContainer>
      <br />

      <Content>
        <Outlet context={{ userId, isOwnedAcc, user }} />
      </Content>
    </PageContainer>
  );
}

export default ProfilePage;
const PageContainer = styled.div`
  max-width: 900px;
  transform: ${({ $isSidebarOpen }) =>
    $isSidebarOpen ? "translateX(5rem)" : "translateX(0rem)"};
  transition: transform 0.3s ease-in-out;
  margin: auto;
  @media (max-width: 800px) {
    padding-top: 4rem;
  }

  @media (max-width: 1200px) {
    transform: none;
  }

  & * {
    color: var(--text-color);
  }
`;
const Content = styled.div``;
const ProfileHeader = styled.div`
  display: flex;

  gap: 0.5rem;
  flex-direction: column;
  margin-bottom: 1rem;
`;
const InfoContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
const ReservedEl = styled.div`
  width: 8rem;
`;

const UsernameBig = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
`;

const UsernameSmall = styled.p`
  font-size: 1rem;
  font-weight: 700;
  opacity: 0.7;
`;
const AvatarContainer = styled.div`
  width: 6rem;
  height: 6rem;
  overflow: hidden;
  border-radius: 50%;
  position: absolute;
  left: 2rem;
  top: 6rem;
`;
const Banner = styled.div`
  width: 100%;
  height: 8rem;
  background-image: ${(props) =>
    props.$image ? `url(${props.$image})` : "none"};
  background-size: cover;
  position: relative;
  border-radius: 8px;
`;
const OperationContainer = styled.div``;
