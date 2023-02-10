import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { api } from "lib/api";

const getMeQueryKey = ["account", "me"];
const getMeQueryFn = api.auth.getMe;

export const useAuthorization = () => {
  const navigate = useNavigate();

  const { status } = useQuery({
    queryKey: getMeQueryKey,
    queryFn: getMeQueryFn,
    onError: () => navigate({ to: "/signin", replace: true }),
  });

  return {
    isAuthenticated: status === "success",
  };
};
