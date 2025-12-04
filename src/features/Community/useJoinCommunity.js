import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { joinCommunityApi } from "../../services/CommunityApi";

export function useJoinCommunity() {
  const queryClient = useQueryClient();

  const { mutateAsync: joinCommunity, isPending: isLoadingJoinCommunity } =
    useMutation({
      mutationFn: (formData) => joinCommunityApi(formData),

      onSuccess: () => {
        toast.success("Community joined Successfully!");
        queryClient.invalidateQueries({ queryKey: ["communities"] });
      },
      onError: (err) => {
        console.log("Creation error: ", err);

        toast.error(err.message || "An error occurred");
        throw err;
      },
    });

  return { joinCommunity, isLoadingJoinCommunity };
}
