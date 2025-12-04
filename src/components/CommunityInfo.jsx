import { BsCalendar2Date } from "react-icons/bs";
import { FaHotjar, FaUser } from "react-icons/fa";
import { MdPublic } from "react-icons/md";
import styled from "styled-components";
import { useFetchPostComment } from "../features/Post/useFetchPostComment";
import { useParams } from "react-router-dom";
import ButtonIcon from "./ButtonIcon";
import Spinner from "./Spinner";

function CommunityInfo() {
  const { postId } = useParams();
  const id = postId;
  const { postComment, isLoadComment, errorComment } = useFetchPostComment(id);
  const moderators = [
    { id: 1, name: "kopifan88" },
    { id: 2, name: "latte_lady" },
    { id: 3, name: "barista_joe" },
  ];
  if (isLoadComment) return <Spinner />;
  if (errorComment) return <div>{errorComment}</div>;
  if (!postComment) return <div>Post not found</div>;

  const { community_id, community_name } = postComment[0];
  if (community_id)
    return (
      <Container>
        <Name>C/{community_name}</Name>

        <Row>
          <BsCalendar2Date />
          <p>Created May 20, 2014</p>
        </Row>

        <Row>
          <MdPublic />
          <p>Public</p>
        </Row>

        <StatsRow>
          <Stat>
            <FaUser />
            <span>1.2k Members</span>
          </Stat>
          <Stat>
            <FaHotjar />
            <span>87 Active</span>
          </Stat>
        </StatsRow>

        <Divider />

        <ModeratorSection>
          <ModeratorTitle>Moderators</ModeratorTitle>
          <ModeratorList>
            {moderators.map((mod) => (
              <ModeratorItem key={mod.id}>u/{mod.name}</ModeratorItem>
            ))}
          </ModeratorList>
        </ModeratorSection>

        <ButtonIcon style={{ background: "var(--hover-color)" }}>
          Join
        </ButtonIcon>
      </Container>
    );
}

export default CommunityInfo;

// --- Styled Components ---
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  border-radius: 10px;
  padding: 1rem;
  color: var(--text-color);
`;

const Name = styled.p`
  font-weight: 700;
  font-size: 1.2rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-size: 0.9rem;

  svg {
  }
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 500;

  svg {
    color: var(--text-color);
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 0.5rem 0;
`;

const ModeratorSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const ModeratorTitle = styled.p`
  font-weight: 600;
`;

const ModeratorList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ModeratorItem = styled.li`
  font-size: 0.9rem;

  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #e36414;
  }
`;
