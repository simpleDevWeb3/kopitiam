import { useQuery } from "@tanstack/react-query";

import { getMembersCommunityApi } from "../../../../services/CommunityApi";

export function useFetchMembers(community_id) {
  const {
    data: members,
    isLoading: isLoadMembers,
    error: errorMembers,
  } = useQuery({
    queryKey: ["members", community_id],
    queryFn: () => getMembersCommunityApi(community_id),

    refetchOnWindowFocus: false,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 30,

    retry: 1,
  });

  return { members, isLoadMembers, errorMembers };
}
