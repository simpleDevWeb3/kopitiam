import { useState } from "react";
import styled from "styled-components";
import { HiOutlineCheckCircle } from "react-icons/hi";

function NotificationLayout() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Your post received a new comment!",
      time: "2 mins ago",
      isRead: false,
    },
    {
      id: 2,
      message: "You have a new follower: barista_joe",
      time: "10 mins ago",
      isRead: false,
    },
    {
      id: 3,
      message: "Your post was upvoted by technerd 💻",
      time: "1 hour ago",
      isRead: true,
    },
  ]);

  function markAsRead(id) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  }

  function markAllAsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }

  return (
    <Wrapper>
      <Header>
        <Title>Notifications</Title>
        <MarkAllButton onClick={markAllAsRead}>
          <HiOutlineCheckCircle />
          Mark all as read
        </MarkAllButton>
      </Header>

      <NotificationList>
        {notifications.length === 0 ? (
          <EmptyState>No notifications yet</EmptyState>
        ) : (
          notifications.map((n) => (
            <NotificationItem
              key={n.id}
              $isRead={n.isRead}
              onClick={() => markAsRead(n.id)}
            >
              <Message>{n.message}</Message>
              <Time>{n.time}</Time>
            </NotificationItem>
          ))
        )}
      </NotificationList>
    </Wrapper>
  );
}

export default NotificationLayout;

const Wrapper = styled.div`
  margin: 2rem auto;

  max-width: 50rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color, #333);
`;

const MarkAllButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: inherit;
  color: var(--text-color);
  border: none;
  padding: 0.5rem 0.8rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.15s;
  &:hover {
    background: var(--hover-color);
  }
`;

const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--text-color);
`;

const NotificationItem = styled.div`
  background: ${({ $isRead }) => ($isRead ? "inherit" : "rgba(0,0,0,0.1)")};

  padding: 1rem;

  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: var(--hover-color);
  }
`;

const Message = styled.div`
  font-size: 1rem;
  color: var(--text-color, #333);
`;

const Time = styled.div`
  font-size: 0.8rem;

  margin-top: 0.2rem;
`;

const EmptyState = styled.div`
  text-align: center;

  padding: 2rem 0;
`;
