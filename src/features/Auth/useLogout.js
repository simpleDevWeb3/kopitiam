import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutApi } from "../../services/AuthApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Recommended for redirection

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending: isLoadingLogout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();

      localStorage.clear();

      sessionStorage.clear();

      toast.success("User Logout Successfully!");

      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log("Logout error: ", err);
      toast.error("Error logging out");
    },
  });

  return { logout, isLoadingLogout };
}
