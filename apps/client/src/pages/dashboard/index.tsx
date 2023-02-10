import { lazy, Route } from "@tanstack/react-router";

import { rootRoute } from "app";
import { Dashboard } from "features/dashboard";
import { api } from "lib/api";
import { queryClient } from "lib/query-client";

export const dashboardRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "dashboard",
  onLoad: () => {
    queryClient.ensureQueryData({
      queryKey: ["jobs"],
      queryFn: () => api.jobs.getAll(),
    });

    queryClient.ensureQueryData({
      queryKey: ["clients"],
      queryFn: () => api.clients.getAll(),
    });
  },
  component: lazy(() => Promise.resolve({ default: DashboardPage })),
});

function DashboardPage() {
  // TODO: THIS NEEDS REFACTORING
  return <Dashboard />;
}
