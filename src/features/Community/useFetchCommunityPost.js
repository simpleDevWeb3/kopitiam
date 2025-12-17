import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllCommunityPostApi } from "../../services/CommunityApi";

export function useFetchComunityPost(community_id, user_id) {
  const {
    data,
    isLoading: isLoadCommunityPost,
    error: errorCommunityPost,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["communityPost", community_id],

    queryFn: ({ pageParam }) =>
      getAllCommunityPostApi(user_id, community_id, pageParam),

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 3) return undefined;

      // Calculate next page index
      return allPages.length + 1;
    },

    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 1,
  });

  // Safety check for data.pages
  const posts = data?.pages?.flat() || [];

  return {
    posts,
    isLoadCommunityPost,
    errorCommunityPost,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
