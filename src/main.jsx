import "./styles/globalStyles.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import CommentPage from "./pages/CommentPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import CommunityPage from "./pages/CommunityPage.jsx";
import PopularPage from "./pages/PopularPage.jsx";
import CreatePostPage from "./pages/CreatePostPage.jsx";
import { SidebarProvider } from "./context/SidebarContext.jsx";
import { ModalProvider } from "./context/ModalContext.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import CommunitiesPage from "./pages/CommunitiesPage.jsx";
import { AuthProvider } from "./features/Auth/AuthContext.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import { DarkThemeProvider } from "./context/DarkThemeContext.jsx";
import SettingPage from "./pages/SettingPage.jsx";
import PostsTab from "./features/Profile/PostsTab.jsx";
import SavedPosts from "./features/Profile/SavedPosts.jsx";
import Upvoted from "./features/Profile/Upvoted.jsx";
import Draft from "./features/Profile/Draft.jsx";
import Downvoted from "./features/Profile/DownVoted.jsx";
import History from "./features/Profile/History.jsx";
import CommentedTab from "./features/Profile/CommentedTab.jsx";
import ProfileSetting from "./features/Settings/ProfileSetting.jsx";
import AccountSetting from "./features/Settings/AccountSetting.jsx";
import PrivacySetting from "./features/Settings/PrivacySetting.jsx";
import Dashboardpage from "./pages/Dashboardpage.jsx";
import Overview from "./features/Dashboard/Overview.jsx";

import ManageUser from "./features/Dashboard/ManageUser.jsx";
import ManagePost from "./features/Dashboard/ManagePost.jsx";
import ManageCommutiy from "./features/Dashboard/ManageCommunity.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "community/:communityId",
        element: <CommunityPage />,
      },
      {
        path: "Communities",
        element: <CommunitiesPage />,
      },
      {
        path: "comment/:postId",
        element: <CommentPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "popular",
        element: <PopularPage />,
      },
      {
        path: "create",
        element: <CreatePostPage />,
      },
      {
        path: "notification",
        element: <NotificationPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
        children: [
          { index: true, element: <PostsTab /> },
          { path: "POST", element: <PostsTab /> },
          { path: "SAVED", element: <SavedPosts /> },
          { path: "COMMENTED", element: <CommentedTab /> },
          { path: "UPVOTED", element: <Upvoted /> },
          { path: "DOWNVOTED", element: <Downvoted /> },
          { path: "HISTORY", element: <History /> },
          { path: "DRAFT", element: <Draft /> },
        ],
      },

      {
        path: "settings",
        element: <SettingPage />,
        children: [
          { index: true, element: <AccountSetting /> },
          { path: "ACCOUNT", element: <AccountSetting /> },
          { path: "PROFILE", element: <ProfileSetting /> },
          { path: "PRIVACY", element: <PrivacySetting /> },
        ],
      },
      {
        path: "dashboard",
        element: <Dashboardpage />,
        children: [
          { index: true, element: <Overview /> },
          { path: "overview", element: <Overview /> },
          { path: "groups", element: <ManageCommutiy /> },
          { path: "users", element: <ManageUser /> },
          { path: "posts", element: <ManagePost /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <DarkThemeProvider>
        <ModalProvider>
          <SidebarProvider>
            <RouterProvider router={router} />
          </SidebarProvider>
        </ModalProvider>
      </DarkThemeProvider>
    </AuthProvider>
  </StrictMode>
);
