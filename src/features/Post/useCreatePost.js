import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createPostApi } from "../../services/PostApi";

export function useCreatePost(success) {
  const queryClient = useQueryClient();
  const {
    mutate: createPost,
    isPending: isLoadCreatePost,
    error: errorCreatePost,
  } = useMutation({
    mutationFn: (formData) => {
      return createPostApi(formData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      toast.success("User created post successfully!.");

      if (success) success();
    },
    onError: (err) => {
      console.log("ERROR: ", err);
      toast.error("ERROR: ", err);
    },
  });

  return { createPost, isLoadCreatePost, errorCreatePost };
}
