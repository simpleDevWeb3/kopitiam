import { useParams } from "react-router-dom";
import forumData from "../../data/post";
import PostList from "../Post/PostList";
import styled from "styled-components";
import CommunityProfileCard from "../../components/CommunityProfileCard";
import CommunityInfo from "../../components/CommunityInfo";
import useSidebar from "../../hook/useSidebar";

function CommunityPosts() {
  const { communityId } = useParams();
  const { posts, comments, communities } = forumData;
  const { isSidebarOpen } = useSidebar();

  // filter posts from this community
  const communityPosts = posts
    .filter((post) => post.communityId === communityId)
    .map((post) => ({
      ...post,
      postComments: comments.filter((c) => c.postId === post.id),
    }));

  const community = communities.find((c) => c.id === communityId);

  return (
    <>
      {/* Sliding Main Content */}
      <PageContainer isSidebarOpen={isSidebarOpen}>
        {/* Banner Section */}
        <BannerWrapper>
          <CommunityProfileCard communityData={community} />
        </BannerWrapper>

        {/* Main Content Section */}
        <ContentContainer>
          <HorizontalContainer>
            <MainSection>
              <PostList postData={communityPosts} />
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
  transform: ${(props) =>
    props.isSidebarOpen ? "translateX(17rem)" : "translateX(10rem)"};
  transition: transform 0.3s ease;
`;

const BannerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  & > * {
    width: 90%;
    max-width: 80rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  max-width: 80rem;
  margin-top: 1rem;
  transition: all 0.3s ease;
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
  gap: 1rem;
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
