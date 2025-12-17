import React from "react";
import styled from "styled-components";
import { useModal } from "../../../../context/ModalContext";
import { useFetchAllBanned } from "../Overview/useFetchAllBanned";
import { useUser } from "../../../Auth/useUser";
import BannedReason from "../../../../components/BannedReason";

// --- Styled Components Definitions ---

const Container = styled.div`
  padding: 24px;

  max-width: 650px;
  width: 100%;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  color: var(--text-color);
`;

const UserGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #e1e1e1;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
`;

const TimeStamp = styled.span`
  font-size: 12px;
  color: var(--text-color);
  margin-top: 2px;
`;

const BannedBadge = styled.span`
  background-color: #fee2e2;
  color: #dc2626;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ReasonContainer = styled.div`
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
  padding: 12px;
  border-radius: 8px;
  font-size: 13px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ReasonTitle = styled.span`
  font-weight: 700;
  text-transform: uppercase;
  font-size: 11px;
  opacity: 0.8;
`;

const ContentWrapper = styled.div`
  margin-bottom: 24px;
`;

const PostTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
  margin: 0 0 8px 0;
`;

const PostText = styled.p`
  font-size: 15px;
  color: var(--text-color);
  line-height: 1.6;
  white-space: pre-wrap;
  margin: 0;
`;

const MetaTags = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;

const Tag = styled.span`
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 500;
  background-color: ${(props) =>
    props.$type === "community" ? "#f3e8ff" : "#eff6ff"};
  color: ${(props) => (props.$type === "community" ? "#7e22ce" : "#2563eb")};
  border: 1px solid
    ${(props) => (props.$type === "community" ? "#e9d5ff" : "#dbeafe")};
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background: #eee;
  margin-bottom: 16px;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const MetricItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
`;

// --- Main Component ---

function PostInsight() {
  const { modalData } = useModal();
  const { user } = useUser();
  // Fetch all bans
  const { banned } = useFetchAllBanned(user?.id);
  // Safety check
  if (!modalData) return null;

  const {
    user_id, // Need this to find the ban record
    id,
    user_name,
    avatar_url,
    created_at,
    title,
    text,
    topic_name,
    community_name,
    total_upVote,
    total_downVote,
    total_comment,
    is_banned,
  } = modalData;

  const banRecord = banned?.data?.find((b) => b.postId === id);

  const reason = banRecord?.reason;

  // Format Date
  const formattedDate = new Date(created_at).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <Container>
      <Header>
        <UserGroup>
          <Avatar src={avatar_url} alt={user_name} />
          <UserInfo>
            <UserName>{user_name}</UserName>
            <TimeStamp>{formattedDate}</TimeStamp>
          </UserInfo>
        </UserGroup>

        {is_banned && <BannedBadge>Banned</BannedBadge>}
      </Header>

      {/* Show Reason Box if banned and reason exists */}
      {is_banned && reason && <BannedReason reason={reason} />}

      <ContentWrapper>
        <PostTitle>{title}</PostTitle>
        <PostText>{text}</PostText>
      </ContentWrapper>

      <MetaTags>
        {topic_name && <Tag>#{topic_name}</Tag>}
        {community_name && <Tag $type="community">c/{community_name}</Tag>}
      </MetaTags>

      <Divider />

      <Footer>
        <MetricItem>
          <span>⬆️</span> {total_upVote} Upvotes
        </MetricItem>
        <MetricItem>
          <span>⬇️</span> {total_downVote} Downvotes
        </MetricItem>
        <MetricItem>
          <span>💬</span> {total_comment} Comments
        </MetricItem>
      </Footer>
    </Container>
  );
}

export default PostInsight;
