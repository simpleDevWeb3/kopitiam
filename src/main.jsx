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

import Dashboardpage from "./pages/Dashboardpage.jsx";
import Overview from "./features/Dashboard/Overview.jsx";

import ManageUser from "./features/Dashboard/ManageUser.jsx";
import ManagePost from "./features/Dashboard/ManagePost.jsx";
import ManageCommutiy from "./features/Dashboard/ManageCommunity.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoute from "./components/ProtectedRoute";
import SearchPostResult from "./features/Search/SearchPostResult.jsx";
import SearchCommunityResult from "./features/Search/SearchCommunityResult.jsx";
import SearchAccountResult from "./features/Search/SearchAccountResult.jsx";
import CommunityFeed from "./features/Community/CommunityFeed.jsx";
import CommunityMembers from "./features/Community/CommunityMembers.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <DarkThemeProvider>
          <ModalProvider>
            <SidebarProvider>
              <App />
            </SidebarProvider>
          </ModalProvider>
        </DarkThemeProvider>
      </AuthProvider>
    ),
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "community/:communityId",
        element: <CommunityPage />,
        children: [
          { index: true, element: <CommunityFeed /> },
          { path: "members", element: <CommunityMembers /> },
        ],
      },

      { path: "Communities", element: <CommunitiesPage /> },
      { path: "comment/:postId", element: <CommentPage /> },
      { path: "search", element: <SearchPage /> },
      { path: "popular", element: <PopularPage /> },

      // Protected Routes
      {
        path: "create",
        element: (
          <ProtectedRoute>
            <CreatePostPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "notification",
        element: (
          <ProtectedRoute>
            <NotificationPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile/:userId",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <PostsTab /> },
          { path: "POST", element: <PostsTab /> },

          { path: "COMMENTED", element: <CommentedTab /> },
          { path: "UPVOTED", element: <Upvoted /> },
          { path: "DOWNVOTED", element: <Downvoted /> },
        ],
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <SettingPage />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <AccountSetting /> },
          { path: "ACCOUNT", element: <AccountSetting /> },
          { path: "PROFILE", element: <ProfileSetting /> },
        ],
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboardpage />
          </ProtectedRoute>
        ),
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
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
