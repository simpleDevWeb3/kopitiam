import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getIsDupEmailApi } from "../../services/AuthApi";
import { useDebounce } from "../../hook/useDebound";
import { useState } from "react";

export function useIsDupEmail(email) {
  const [debounceEmail, setDebounceEmail] = useState("");
  useDebounce(setDebounceEmail, email, 500);
  const {
    data: isDupEmail,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["isDupEmail", debounceEmail],
    queryFn: () => getIsDupEmailApi(debounceEmail),
    enabled: !!debounceEmail,
    retry: false,
    onError: (err) => {
      toast.error(err.response?.data?.error || "Failed to validate");
    },
  });

  return {
    isDupEmail,
    isLoading,
    isError,
    error,
  };
}
