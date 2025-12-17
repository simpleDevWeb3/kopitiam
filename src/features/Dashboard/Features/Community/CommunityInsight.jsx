import React from "react";
import styled from "styled-components";
import { useModal } from "../../../../context/ModalContext";

import { useUser } from "../../../Auth/useUser";
import { useFetchAllBanned } from "../Overview/useFetchAllBanned";
import BannedReason from "../../../../components/BannedReason";
import { useFetchUsers } from "../Users/useFetchUsers";

// --- Styled Components ---

const Container = styled.div`
  background-color: var(--background-glass);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  max-width: 40rem;
  min-width: 40rem;
  width: 100%;
  margin: 0 auto;
  overflow: hidden; /* Clips the banner corners */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const Banner = styled.div`
  height: 140px;
  width: 100%;
  background-color: #e2e8f0;
  background-image: url(${(props) => props.$src});
  background-size: cover;
  background-position: center;
`;

const ContentPadding = styled.div`
  padding: 0 24px 24px 24px;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: -40px; /* Pulls avatar up into banner */
  margin-bottom: 16px;
`;

const IdentityGroup = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 16px;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 16px; /* Squircle shape for communities */
  object-fit: cover;
  border: 4px solid var(--hover-color);
  background-color: var(--background-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TitleGroup = styled.div`
  padding-bottom: 4px; /* Align with bottom of avatar */
`;

const CommunityName = styled.h2`
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: var(--text-color);
`;

const MemberCount = styled.span`
  font-size: 13px;
  color: var(--text-color);
  font-weight: 500;
`;

const StatusBadges = styled.div`
  display: flex;
  gap: 8px;
  padding-bottom: 8px;
`;

const Badge = styled.span`
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  /* Dynamic Styling */
  background-color: ${(props) =>
    props.$type === "banned" ? "#fee2e2" : "#dcfce7"};
  color: ${(props) => (props.$type === "banned" ? "#dc2626" : "#166534")};
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

const Description = styled.p`
  font-size: 15px;
  color: var(--text-color);
  line-height: 1.6;
  margin: 0 0 20px 0;
  white-space: pre-wrap;
`;

const SectionLabel = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  color:var(--text-color);
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
`;

const TopicsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

const TopicTag = styled.span`
  background-color: #f3f4f6;
  color: #374151;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: 500;
  border: 1px solid #e5e7eb;
`;

const Footer = styled.div`
  border-top: 1px solid #f3f4f6;
  padding-top: 16px;
  display: flex;
  gap: 24px;
  font-size: 12px;
  color: #9ca3af;
`;

// --- Main Component ---

function CommunityInsight() {
  const { modalData } = useModal();
  const { user } = useUser();
  const { banned } = useFetchAllBanned(user?.id);
  const { users, isLoadUsers, errorUsers } = useFetchUsers();
  if (!modalData) return null;

  // Destructuring (Note: Data uses camelCase keys)
  const {
    id,
    name,
    description,
    bannerUrl,
    avatarUrl,
    createdAt,
    topics, // This is an array: [{ id, name }]
    isJoined,
    isBanned,
    memberCount,
    adminId,
  } = modalData;

  //find Admin
  const admin = users?.find((u) => u.id === adminId);
  const adminName = admin?.name;
  // --- Ban Logic ---

  // Attempt to find a ban record for this specific community ID
  // Adjust 'community_id' key based on your actual Supabase table structure
  const banRecord = banned?.data?.find((b) => b.communityId === id);
  const reason = banRecord?.reason;

  // Format Date
  const formattedDate = new Date(createdAt).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <Container>
      {/* Banner Section */}
      <Banner $src={bannerUrl} />

      <ContentPadding>
        {/* Header: Avatar, Name, Stats */}
        <HeaderSection>
          <IdentityGroup>
            <Avatar src={avatarUrl} alt={name} />
            <TitleGroup>
              <CommunityName>{name}</CommunityName>
              <MemberCount>{memberCount} Members</MemberCount>
            </TitleGroup>
          </IdentityGroup>

          <StatusBadges>
            {isBanned && <Badge $type="banned">Banned</Badge>}
          </StatusBadges>
        </HeaderSection>

        {/* Ban Reason Alert */}
        {isBanned && reason && <BannedReason reason={reason} />}
        {/* Community Admin */}
        <SectionLabel>Community Admin</SectionLabel>
        <Description>{adminName || "Name not found"}</Description>
        {/* Description */}
        <SectionLabel>About</SectionLabel>
        <Description>{description || "No description provided."}</Description>

        {/* Topics List */}
        {topics && topics.length > 0 && (
          <>
            <SectionLabel>Topics</SectionLabel>
            <TopicsContainer>
              {topics.map((topic) => (
                <TopicTag key={topic.id}>{topic.name}</TopicTag>
              ))}
            </TopicsContainer>
          </>
        )}

        {/* Footer Meta */}
        <Footer>
          <span>Created: {formattedDate}</span>
          <span>ID: {id}</span>
        </Footer>
      </ContentPadding>
    </Container>
  );
}

export default CommunityInsight;
