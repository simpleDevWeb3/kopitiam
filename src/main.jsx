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
