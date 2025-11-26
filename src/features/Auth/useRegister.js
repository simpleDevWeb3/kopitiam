import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../../services/AuthApi";
import toast from "react-hot-toast";
export function useRegister(onHandleSuccess) {
  const { mutate: register, isPending: isLoadingRegister } = useMutation({
    mutationFn: (formData) => {
      registerApi(formData);
    },
    onSuccess: () => {
      toast.success("User registered successfully, please login again.");
      onHandleSuccess?.();
    },
    onError: (err) => {
      console.log("ERROR: ", err);
      toast.error("ERROR: ", err);
    },
  });

  return { register, isLoadingRegister };
}
