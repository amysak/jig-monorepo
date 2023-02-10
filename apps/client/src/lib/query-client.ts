import { QueryClient } from "@tanstack/react-query";
import { message } from "antd";

import { formatError } from "./error";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      networkMode: "always",
      refetchOnWindowFocus: import.meta.env.DEV,
      onError: async (error) => {
        // await queryClient.cancelQueries();
        message.error(formatError(error));
      },
    },
    mutations: {
      retry: 0,
      networkMode: "always",
      onError: async (error) => {
        // await queryClient.cancelQueries();
        message.error(formatError(error));
      },
    },
  },
});
