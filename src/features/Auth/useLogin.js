import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi } from "../../services/AuthApi";

export function useLogin() {
  const queryClient = useQueryClient();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      if (!data?.profile || !data?.accessToken) return;

      // Save to localStorage
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("userProfile", JSON.stringify(data.profile));

      // Update React Query cache
      queryClient.setQueryData(["user"], {
        profile: data.profile,
        accessToken: data.accessToken,
        isAuthenticated: true,
      });
    },
    onError: (err) => {
      console.log("Login error: ", err);
    },
  });

  return { login, isLoading };
}
