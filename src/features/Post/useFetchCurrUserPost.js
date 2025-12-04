import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllPostApi } from "../../services/PostApi";

export function useFetchCurrUserPost(user_id) {
  const {
    data,
    isLoading: isLoadPost,
    error: errorPost,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", user_id],
    queryFn: ({ pageParam }) => getAllPostApi(user_id, pageParam),

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 3) {
        return undefined;
      }

      return allPages.length + 1;
    },

    refetchOnWindowFocus: false,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 30,

    retry: 1,
  });

  const posts = data?.pages.flat() || [];
  return {
    posts,
    isLoadPost,
    errorPost,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
