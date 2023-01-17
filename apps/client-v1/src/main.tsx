import { QueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { hydrate } from "react-dom";
import { createRoot } from "react-dom/client";

import { formatError } from "utilities/error";
import { RootApp } from "./app";

import "./assets/styles/index.scss";

// The results of this query will be cached like a normal query
// await queryClient.prefetchQuery({
//   queryKey: ['todos'],
//   queryFn: fetchTodos,
// })

// https://react-query-v3.tanstack.com/quick-start

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: import.meta.env.DEV,
      onError: (error) => {
        message.error(formatError(error));
      },
    },
    mutations: {
      retry: 0,
      onError: (error) => {
        message.error(formatError(error));
      },
    },
  },
});

export const rootNode = document.getElementById("root");
const root = createRoot(rootNode);

if (rootNode?.hasChildNodes()) {
  hydrate(<RootApp />, rootNode);
} else {
  root.render(<RootApp />);
}
