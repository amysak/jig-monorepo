import { Outlet, Route } from "@tanstack/react-router";

import { rootRoute } from "app";
import SetupLayout from "layouts/setup";
import { setupSearchSchema } from "lib/validation";

import "./setup.scss";

// type SetupSearch = z.infer<typeof setupSearchSchema>;

export const setupRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "setup",
  validateSearch: setupSearchSchema,
  component: () => (
    <SetupLayout>
      <Outlet />
    </SetupLayout>
  ),
});

export const setupIndexRoute = new Route({
  getParentRoute: () => setupRoute,
  path: "/",
  // TODO
  // component: () => <Navigate to="/setup/cabinets" />,
});
