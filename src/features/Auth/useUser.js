// features/Auth/useUser.js
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react"; // <--- 1. Import useEffect
import { getCurrentUserApi } from "../../services/AuthApi";

export function useUser() {
  const { isLoading, data, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUserApi,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 15,
    retry: false,
    initialData: () => {
      const storedUser = localStorage.getItem("userProfile");
      return storedUser ? JSON.parse(storedUser) : undefined;
    },
  });

  // Whenever 'data' changes (fresh from server), update LocalStorage automatically.
  useEffect(() => {
    if (data) {
      localStorage.setItem("userProfile", JSON.stringify(data));
    }
  }, [data]);

  const isAuthenticated = !!data;
  return { isLoading, user: data, isAuthenticated, isFetching };
}
