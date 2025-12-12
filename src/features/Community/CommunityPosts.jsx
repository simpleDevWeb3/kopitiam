import { useParams } from "react-router-dom";
import forumData from "../../data/post";
import PostList from "../Post/PostList";
import styled from "styled-components";
import CommunityProfileCard from "../../components/CommunityProfileCard";
import CommunityInfo from "../../components/CommunityInfo";
import useSidebar from "../../hook/useSidebar";
import { useFetchCommunity } from "./useFetchCommunity";
import Spinner from "../../components/Spinner";
import { useFetchComunityPost } from "./useFetchCommunityPost";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Mosaic } from "react-loading-indicators";
import { useUser } from "../Auth/useUser";
import { useLeaveCommunity } from "./useLeaveCommunity";
import { useJoinCommunity } from "./useJoinCommunity";
import NoExist from "../../components/NoExist";
import Modal from "../../components/Modal";
import EditCommunityForm from "./EditCommunityForm";

function CommunityPosts() {
  const { communityId } = useParams();

  const { $isSidebarOpen } = useSidebar();
  const { user } = useUser();
  const { community, isLoadCommunity, errorCommunity } = useFetchCommunity(
    communityId,
    user?.id
  );

  const {
    posts,
    isLoadCommunityPost,
    errorCommunityPost,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchComunityPost(communityId);
  const existPost = posts.length > 0;
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (isLoadCommunity) return <Spinner />;
  if (isLoadCommunityPost) return <Spinner />;
  if (errorCommunity)
    return (
      <div>
        <h1>{errorCommunity}</h1>
      </div>
    );
  if (errorCommunityPost)
    return (
      <div>
        <h1>{errorCommunityPost}</h1>
      </div>
    );

  return (
    <>
      {/* Sliding Main Content */}
      <PageContainer $isSidebarOpen={$isSidebarOpen}>
        <Modal id="Edit Community">
          <EditCommunityForm />
        </Modal>
        {/* Banner Section */}
        <BannerWrapper>
          <CommunityProfileCard communityData={community} />
        </BannerWrapper>

        {/* Main Content Section */}
        <ContentContainer>
          <HorizontalContainer>
            <MainSection>
              {!existPost && <NoExist name={"post"} />}
              {posts && <PostList postData={posts} />}

              <div
                ref={ref}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "10rem",
                  width: "100%",
                }}
              >
                {isFetchingNextPage && (
                  <Mosaic
                    color="rgba(21, 144, 221, 0.889)"
                    size="large"
                    text=""
                    textColor=""
                  />
                )}
              </div>
            </MainSection>

            <Sidebar>
              <CommunityInfo />
            </Sidebar>
          </HorizontalContainer>
        </ContentContainer>
      </PageContainer>
    </>
  );
}

/* --- STYLES --- */

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  min-height: 100vh;

  /* SLIDE ANIMATION */
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

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  max-width: 80rem;
  margin-top: 1rem;
  transition: all 0.3s ease;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

const HorizontalContainer = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  align-items: flex-start;
`;

const MainSection = styled.div`
  flex: 1;
  max-width: 60rem;
  display: flex;
  flex-direction: column;
`;

const Sidebar = styled.div`
  width: 20rem;
  position: sticky;
  top: 5rem;
  align-self: flex-start;
  background: var(--secondary-color);
  border-radius: 8px;
  padding: 1rem;
  border: solid 1px var(--tertiary-color);
  @media (max-width: 1300px) {
    display: none;
  }
`;

export default CommunityPosts;
