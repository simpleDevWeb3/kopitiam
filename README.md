src/
 ├─ app/
 │   ├─ store.js               # Redux / Zustand / React Query setup
 │   ├─ App.jsx
 │   └─ routes.jsx             # All routes configuration (React Router)
 │
 ├─ components/                # Reusable, dumb/presentational components
 │   ├─ Button.jsx
 │   ├─ Text.jsx
 │   ├─ Avatar.jsx
 │   ├─ Card.jsx
 │   └─ Modal.jsx
 │
 ├─ features/                  # Domain / feature modules
 │   ├─ post/
 │   │   ├─ Post.jsx
 │   │   ├─ PostList.jsx
 │   │   ├─ PostVote.jsx
 │   │   ├─ PostForm.jsx
 │   │   ├─ usePost.js
 │   │   └─ postSlice.js       # (if using Redux) or postApi.js (if using React Query)
 │   │
 │   ├─ comment/
 │   │   ├─ Comment.jsx
 │   │   ├─ CommentList.jsx
 │   │   ├─ CommentForm.jsx
 │   │   └─ useComment.js
 │   │
 │   ├─ auth/
 │   │   ├─ LoginForm.jsx
 │   │   ├─ RegisterForm.jsx
 │   │   ├─ AuthProvider.jsx
 │   │   └─ useAuth.js
 │   │
 │   ├─ community/
 │   │   ├─ CommunityList.jsx
 │   │   ├─ CommunityCard.jsx
 │   │   ├─ useCommunity.js
 │   │   └─ CreateCommunityForm.jsx
 │
 ├─ pages/                     # Pages for routing
 │   ├─ HomePage.jsx
 │   ├─ PopularPage.jsx
 │   ├─ PostDetailPage.jsx
 │   ├─ CommunityPage.jsx
 │   ├─ CreatePostPage.jsx
 │   └─ LoginPage.jsx
 │
 ├─ layouts/                   # Layouts shared by multiple pages
 │   ├─ MainLayout.jsx
 │   ├─ AuthLayout.jsx
 │   └─ Sidebar.jsx
 │
 ├─ hooks/                     # Global custom hooks
 │   ├─ useTheme.js
 │   ├─ useModal.js
 │   └─ useScrollLock.js
 │
 ├─ utils/                     # Helper functions / formatters
 │   ├─ dateFormatter.js
 │   ├─ voteUtils.js
 │   └─ constants.js
 │
 ├─ assets/                    # Images, icons, fonts, etc.
 │   ├─ images/
 │   └─ icons/
 │
 ├─ styles/                    # Global styles, themes, variables
 │   ├─ GlobalStyle.js
 │   └─ theme.js
 │
 ├─ data/                      # Optional mock/fake data (for development)
 │   └─ forumData.js
 │
 └─ index.js                   # React entry point
