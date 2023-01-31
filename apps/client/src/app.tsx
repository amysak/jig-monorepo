import { Outlet, Router } from "@tanstack/react-location";
import { ReactLocationDevtools } from "@tanstack/react-location-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider, message } from "antd";

import { ErrorBoundary } from "components/error";
import { Fallback } from "layouts/fallback";
import { formatError } from "lib/error";
import { theme } from "lib/theme";

import { location, LocationGenerics, routes } from "./router";

// The results of this query will be cached like a normal query
// await queryClient.prefetchQuery({
//   queryKey: ['todos'],
//   queryFn: fetchTodos,
// })

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      networkMode: "always",
      refetchOnWindowFocus: import.meta.env.DEV,
      onError: async (error) => {
        await queryClient.cancelQueries();
        message.error(formatError(error));
      },
    },
    mutations: {
      retry: 0,
      networkMode: "always",
      onError: async (error) => {
        await queryClient.cancelQueries();
        message.error(formatError(error));
      },
    },
  },
});

export const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools position="bottom-right" />
        <Router<LocationGenerics>
          location={location}
          routes={routes}
          defaultPendingElement={<Fallback />}
        >
          {import.meta.env.DEV && (
            <ReactLocationDevtools position="top-right" />
          )}
          <ConfigProvider theme={theme} componentSize="small">
            <Outlet />
          </ConfigProvider>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
