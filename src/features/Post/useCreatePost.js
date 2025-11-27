import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createPostApi } from "../../services/PostApi";

export function useCreatePost() {
  const queryClient = useQueryClient();
  const {
    mutate: createPost,
    isPending: isLoadCreatePost,
    error: errorCreatePost,
  } = useMutation({
    mutationFn: (formData) => {
      createPostApi(formData);
    },
    onSuccess: () => {
      toast.success("User created post successfully!.");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err) => {
      console.log("ERROR: ", err);
      toast.error("ERROR: ", err);
    },
  });

  return { createPost, isLoadCreatePost, errorCreatePost };
}
