import { lazy, Route } from "@tanstack/react-router";

import { rootRoute } from "app";
import { userSearchSchema } from "lib/validation";

export const meRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "me",
  validateSearch: userSearchSchema,
  component: lazy(() => import("./me")),
});
