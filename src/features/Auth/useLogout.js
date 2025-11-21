import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutApi } from "../../services/AuthApi";

export function useLogout() {
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      // Remove cache and localStorage
      queryClient.setQueryData(["user"], null);
      localStorage.removeItem("token");
      localStorage.removeItem("userProfile");
    },
    onError: (err) => {
      console.log("Logout error: ", err);
    },
  });

  return { logout, isLoading };
}
