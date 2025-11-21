import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutApi } from "../../services/AuthApi";
import toast from "react-hot-toast";

export function useLogout() {
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      // Remove cache and localStorage
      queryClient.setQueryData(["user"], null);
      localStorage.removeItem("token");
      localStorage.removeItem("userProfile");

      toast.success("User Logout Successfully!");
    },
    onError: (err) => {
      console.log("Logout error: ", err);
    },
  });

  return { logout, isLoading };
}
