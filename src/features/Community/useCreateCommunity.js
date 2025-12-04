import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createCommunityApi } from "../../services/CommunityApi";

export function useCreateCommunity(onHandleSuccess) {
  const queryClient = useQueryClient();

  const { mutateAsync: createCommunity, isPending: isLoadingCreateCommunity } =
    useMutation({
      mutationFn: (formData) => createCommunityApi(formData),
      onSuccess: () => {
        toast.success("Community created successfully!");
        queryClient.invalidateQueries({ queryKey: ["communities"] });
        onHandleSuccess?.();
      },
      onError: (err) => {
        console.log("Creation error: ", err);

        toast.error(err.message || "An error occurred");
        throw err;
      },
    });

  return { createCommunity, isLoadingCreateCommunity };
}
