import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { editCommunityProfileApi } from "../../services/CommunityApi";

export function useEditCommunity(success) {
  const queryClient = useQueryClient();
  const {
    mutate: editCommunity,
    isPending: isEditing,
    error: errorEditAccount,
  } = useMutation({
    mutationFn: (formData) => editCommunityProfileApi(formData),
    onSuccess: async () => {
      await queryClient.invalidateQueries();

      toast.success("Community details updated successfully!");
      success?.();
    },
    onError: (err) => {
      console.log("ERROR: ", err);
      toast.error("ERROR: ", err);
    },
  });

  return { editCommunity, isEditing, errorEditAccount };
}
