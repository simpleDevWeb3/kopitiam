import { useQuery } from "@tanstack/react-query";
import { getCurrentUserApi } from "../../services/AuthApi";

export function useUser() {
  const { isLoading, data, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUserApi,

    staleTime: 1000 * 60 * 10,

    gcTime: 1000 * 60 * 15,

    retry: false,

    initialData: () => {
      const storedUser = localStorage.getItem("userProfile");
      return storedUser ? JSON.parse(storedUser) : undefined;
    },

    refetchOnWindowFocus: false,
  });
  if (data === undefined && !isLoading && !isFetching) {
    localStorage.removeItem("userProfile");
  }
  const isAuthenticated = !!data;

  return { isLoading, user: data, isAuthenticated, isFetching };
}
