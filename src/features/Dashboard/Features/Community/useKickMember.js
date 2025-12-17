import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { kickMemberApi } from "../../../../services/CommunityApi";

export function useKickMember() {
  const queryClient = useQueryClient();

  const {
    mutate: kickMember,
    isPending: isLoadKickMember,
    error: errorKickMember,
  } = useMutation({
    mutationFn: (data) => kickMemberApi(data),

    onSuccess: async () => {
      !toast.success("Member Kicked Successful!");
      queryClient.invalidateQueries();
    },

    onError: (err) => {
      console.log("ERROR: ", err);
      toast.error(err.message);
    },
  });

  return { kickMember, isLoadKickMember, errorKickMember };
}
