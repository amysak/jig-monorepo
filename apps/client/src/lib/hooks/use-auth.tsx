import { useQuery } from "@tanstack/react-query";
import { api } from "lib/api";

const getMeQueryKey = ["users", "me"];
const getMeQueryFn = api.auth.getMe;

export const useAuthorization = () => {
  const { data: meResult, status } = useQuery({
    queryKey: getMeQueryKey,
    queryFn: getMeQueryFn,
  });

  return {
    isAuthenticated: status === "success",
    user: meResult,
  };
};
