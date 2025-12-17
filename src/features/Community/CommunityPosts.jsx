import { useParams, Outlet } from "react-router-dom"; // Import Outlet
import styled from "styled-components";
import CommunityProfileCard from "../../components/CommunityProfileCard";
import useSidebar from "../../hook/useSidebar";
import { useFetchCommunity } from "./useFetchCommunity";
import Spinner from "../../components/Spinner";
import { useUser } from "../Auth/useUser";
import Modal from "../../components/Modal";
import EditCommunityForm from "./EditCommunityForm";
import Tabs from "../../components/Tabs";

function CommunityPosts() {
  const { communityId } = useParams();
  const { $isSidebarOpen } = useSidebar();
  const { user } = useUser();

  const { community, isLoadCommunity, errorCommunity } = useFetchCommunity(
    communityId,
    user?.id
  );

  const isAdmin = user?.id === community?.adminId;

  // Tabs Configuration
  const basePath = `/community/${communityId}`;
  const tabLinks = [{ label: "Posts", key: "", index: true }];

  if (isAdmin) {
    tabLinks.push({ label: "Members", key: "members" });
  }

  if (isLoadCommunity) return <Spinner />;
  if (errorCommunity) return <h1>{errorCommunity}</h1>;

  return (
    <PageContainer $isSidebarOpen={$isSidebarOpen}>
      <Modal id="Edit Community">
        <EditCommunityForm />
      </Modal>

      <BannerWrapper>
        <CommunityProfileCard communityData={community} />
      </BannerWrapper>

      <TabsWrapper>
        <Tabs links={tabLinks} basePath={basePath} />
      </TabsWrapper>

      <ContentContainer>
        <HorizontalContainer>
          <MainSection>
            <Outlet context={{ communityId, userId: user?.id }} />
          </MainSection>
        </HorizontalContainer>
      </ContentContainer>
    </PageContainer>
  );
}
// ... styles remain the same
export default CommunityPosts;
/* --- STYLES --- */

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  min-height: 100vh;
  transform: ${({ $isSidebarOpen }) =>
    $isSidebarOpen ? "translateX(17rem)" : "translateX(10rem)"};
  transition: transform 0.3s ease;

  @media (max-width: 800px) {
    transform: translateX(0rem);
    width: 100%;
    padding-top: 3rem;
  }
`;

const BannerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  & > * {
    width: 90%;
    max-width: 80rem;
    @media (max-width: 800px) {
      width: 100%;
    }
  }
`;

const TabsWrapper = styled.div`
  width: 90%;
  max-width: 80rem;
  margin-top: 1rem;
  display: flex;
  justify-content: flex-start;
  /* Adjust padding to align with your design */
  padding-left: 0;

  @media (max-width: 800px) {
    width: 100%;
    padding-left: 1rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: left;
  width: 90%;
  max-width: 80rem;
  margin-top: 1rem;
  transition: all 0.3s ease;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

const HorizontalContainer = styled.div`
  gap: 2rem;

  align-items: flex-start;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

const MainSection = styled.div`
  flex: 1;
  max-width: 60rem;
  display: flex;
  flex-direction: column;
`;
