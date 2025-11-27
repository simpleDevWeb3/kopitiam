import { useQuery } from "@tanstack/react-query";
import { getAllPostApi } from "../../services/PostApi";

export function useFetchPosts() {
  const {
    data: posts,
    isLoading: isLoadPost,
    error: errorPost,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getAllPostApi(null),
  });

  return { posts, isLoadPost, errorPost };
}
