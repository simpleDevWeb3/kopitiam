import styled from "styled-components";
import { useState } from "react";
import { FiUsers } from "react-icons/fi";
import { HiOutlineArrowTrendingUp } from "react-icons/hi2";
import ButtonIcon from "../../components/ButtonIcon";

// Sample community data
const initialCommunities = [
  { id: 1, name: "Kopi Lovers", members: 12500, growth: "up" },
  { id: 2, name: "Tech Nerds", members: 9800, growth: "up" },
  { id: 3, name: "Cafe Creatives", members: 7200, growth: "down" },
  { id: 4, name: "Gaming Mamak", members: 5200, growth: "up" },
  { id: 5, name: "Study Corner", members: 3400, growth: "steady" },
];

function CommunitiesLayout() {
  const [communities, setCommunities] = useState(initialCommunities);

  return (
    <Container>
      <Header>
        <HiOutlineArrowTrendingUp />
        <h2>Top Communities</h2>
      </Header>

      <List>
        {communities.map((community, index) => (
          <CommunityItem key={community.id}>
            <Rank>{index + 1}</Rank>
            <Info>
              <Name>{community.name}</Name>
              <Members>
                <FiUsers />
                {community.members.toLocaleString()} members
              </Members>
            </Info>
            <JoinButton>Join</JoinButton>
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
  height: 100%;
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
  svg {
    font-size: 1.5rem;
    color: var(--text-color);
  }
`;

const List = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 0.8rem;
`;

const CommunityItem = styled.li`
  display: flex;
  align-items: center;
  background: white;
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-radius: 10px;
  justify-content: space-between;
  transition: background 0.2s ease;
  &:hover {
    background: var(--hover-color);
  }
  border: 1px solid var(--hover-color);
`;

const Rank = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--primary-color);
  width: 2rem;
`;

const Info = styled.div`
  flex: 1;
  margin-left: 0.5rem;
`;

const Name = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #3e2c21;
`;

const Members = styled.p`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
  color: #8a7c6f;
`;

const JoinButton = styled.button`
  background: #6f4e37;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: #553926;
  }
`;
