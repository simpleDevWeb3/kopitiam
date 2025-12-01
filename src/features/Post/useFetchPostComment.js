import { useQuery } from "@tanstack/react-query";
import { getPostCommentsApi } from "../../services/PostApi";

export function useFetchPostComment(post_id) {
  const {
    data: postComment,
    isLoading: isLoadComment,
    error: errorComment,
  } = useQuery({
    queryKey: ["postComment", post_id],
    queryFn: () => getPostCommentsApi(post_id),

    refetchOnWindowFocus: false,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 30,

    retry: 1,
  });

  return { postComment, isLoadComment, errorComment };
}
