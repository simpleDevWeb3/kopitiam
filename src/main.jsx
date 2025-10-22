import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import CommentPage from "./pages/CommentPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import CommunityPage from "./pages/CommunityPage.jsx";

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
        path: "table/:comunity",
        element: <CommunityPage />,
        children: [
          {
            path: "comment/:postId/:postTitle?",
            element: <CommentPage />,
          },
        ],
      },

      {
        path: "search",
        element: <SearchPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
