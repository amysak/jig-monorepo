// import Notification from './components/organisms/notification'
import { FallbackUI } from "@jigbid/ui";
import { Outlet, Router } from "@tanstack/react-location";
import { ReactLocationDevtools } from "@tanstack/react-location-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider, message } from "antd";

import { ErrorBoundary } from "components/error";
import MainLayout from "components/layout/main";
import { formatError } from "utilities/error";
import { theme } from "utilities/theme";
import { api } from "./api";
import { location, routes } from "./router";

// The results of this query will be cached like a normal query
// await queryClient.prefetchQuery({
//   queryKey: ['todos'],
//   queryFn: fetchTodos,
// })

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: import.meta.env.DEV,
      onError: async (error) => {
        await queryClient.cancelQueries();
        message.error(formatError(error));
      },
    },
    mutations: {
      retry: 0,
      onError: async (error) => {
        await queryClient.cancelQueries();
        message.error(formatError(error));
      },
    },
  },
});

queryClient.prefetchQuery({
  queryKey: ["account", "me"],
  queryFn: api.auth.getMe,
});

export const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools position="bottom-right" />
        <Router
          location={location}
          routes={routes}
          defaultPendingElement={<FallbackUI />}
        >
          <ReactLocationDevtools position="top-right" />
          <ConfigProvider theme={theme} componentSize="small">
            <MainLayout className="dashboardlayout">
              <Outlet />
            </MainLayout>
          </ConfigProvider>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
