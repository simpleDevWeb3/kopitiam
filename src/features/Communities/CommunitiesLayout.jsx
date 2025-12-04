import styled from "styled-components";
import ButtonIcon from "../../components/ButtonIcon";
import Avatar from "../../components/Avatar";
import { useFetchAllCommunity } from "./useFetchAllCommunity";
import Spinner from "../../components/Spinner";
import { useUser } from "../Auth/useUser";
import { useJoinCommunity } from "../Community/useJoinCommunity";

function CommunitiesLayout() {
  const { communities, isLoadCommunities, errorCommunities } =
    useFetchAllCommunity();
  const { user } = useUser();
  const { joinCommunity, isLoadingJoinCommunity } = useJoinCommunity();

  if (isLoadCommunities)
    return (
      <FullPageLoader>
        <Spinner />
      </FullPageLoader>
    );

  if (errorCommunities) return <div>Error: {errorCommunities}</div>;

  return (
    <Container>
      <Header>
        <Title as={"h3"}>Explore Communities</Title>
      </Header>

      <List>
        {communities.map((community) => (
          <CommunityItem key={community.id}>
            {/* 1. Banner Image */}
            <CardBanner $src={community.bannerUrl || "/default-banner.jpg"} />

            {/* 2. Wrapper for padding */}
            <CardContent>
              <Group>
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <AvatarContainer>
                    <Avatar
                      src={
                        community.avatarUrl
                          ? community.avatarUrl
                          : "/avatar.jpg"
                      }
                    />
                  </AvatarContainer>

                  <Info>
                    <Name>{community.name}</Name>
                    <Stats>{community.members} members</Stats>
                  </Info>
                </div>

                <ButtonIcon
                  disabled={isLoadingJoinCommunity}
                  style={{ padding: "0.5rem 1.2rem", borderRadius: "25px" }}
                  action={() => {
                    joinCommunity({
                      community_id: community.id,
                      user_id: user.id,
                    });
                  }}
                >
                  Join
                </ButtonIcon>
              </Group>

              <Description>
                {community.description
                  ? community.description
                  : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,"}
              </Description>
            </CardContent>
          </CommunityItem>
        ))}
      </List>
    </Container>
  );
}

export default CommunitiesLayout;

// ---------------- styled ----------------

const Container = styled.div`
  padding: 1.5rem;
  padding-top: 0rem;
  margin: 2rem auto;
  max-width: 80rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;
const FullPageLoader = styled.div`
  height: 100vh; /* Occupy full viewport height */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* Optional: Background color to match your theme if needed */
  background-color: var(--background-color);
`;
const Title = styled.h3`
  font-weight: 600;
`;

const List = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem; /* Increased gap slightly for larger cards */

  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const CommunityItem = styled.li`
  display: flex;
  flex-direction: column;
  background: var(--background-color);
  box-shadow: 4px 4px 0px var(--tertiary-color);
  border-radius: 10px;
  border: 1px solid var(--hover-color);
  overflow: hidden; /* Ensures banner stays within rounded corners */
  transition: transform 0.2s ease, background 0.2s ease;

  /* Removed padding here, moved to CardContent */
  padding: 0;

  &:hover {
    background: var(--hover-color);
    transform: translateY(-2px);
  }
`;

const CardBanner = styled.div`
  height: 80px;
  width: 100%;
  background-color: var(--tertiary-color);
  background-image: url(${(props) => props.$src});
  background-size: cover;
  background-position: center;
`;

const CardContent = styled.div`
  padding: 1rem;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const Group = styled.div`
  display: flex;
  align-items: flex-start; /* Align to top to handle the avatar pull-up */
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const AvatarContainer = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;

  /* The Magic: Pull it up over the banner */
  margin-top: -25px;

  /* Create a border matching the card bg to make it "pop" */
  border: 4px solid var(--background-color);
  background-color: var(--background-color);

  ${CommunityItem}:hover & {
    border-color: var(--hover-color); /* Match border color on card hover */
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.8rem;
  padding-top: 0.2rem; /* Push text down slightly to align with bottom of avatar */
`;

const Name = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-color);
  line-height: 1.2;
`;

const Stats = styled.div`
  font-size: 0.85rem;
  color: var(--text-color);
  opacity: 0.8;
`;

const Description = styled.p`
  color: var(--text-color);
  opacity: 0.7;
  font-size: 0.95rem;
  line-height: 1.4;
`;
