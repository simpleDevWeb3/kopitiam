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
        path: "table/:community",
        element: <CommunityPage />,
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
        path: "communitiest",
        element: <CommunityPage />,
      },
      {
        path: "popular",
        element: <PopularPage />,
      },
      {
        path: "create",
        element: <CreatePostPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
