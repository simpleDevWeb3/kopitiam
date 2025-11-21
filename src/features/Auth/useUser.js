import { useQuery } from "@tanstack/react-query";
import { getCurrentUserApi } from "../../services/AuthApi";

export function useUser() {
  const { isLoading, data, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUserApi,
 
    initialData: () => {
      const storedUser = localStorage.getItem("userProfile");
      return storedUser ? JSON.parse(storedUser) : undefined;
    },
    // Optional: refetch on window focus
    refetchOnWindowFocus: true,
  });

  const isAuthenticated = !!data;

  return { isLoading, user: data, isAuthenticated, isFetching };
}
