import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { unbanCommunityApi } from "../../../../services/CommunityApi";

export function useUnbanCommunity() {
  const queryClient = useQueryClient();
  const {
    mutate: unbanCommunity,
    isPending: isLoadUnbanCommunity,
    error: errorUnbanCommunity,
  } = useMutation({
    mutationFn: (formData) => {
      return unbanCommunityApi(formData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      toast.success("community has been unbanned successfully.");


    },
    onError: (err) => {
      console.log("ERROR: ", err);
      toast.error("ERROR: ", err);
    },
  });

  return { unbanCommunity, isLoadUnbanCommunity, errorUnbanCommunity };
}
