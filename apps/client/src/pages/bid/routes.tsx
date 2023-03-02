import { lazy, Route } from "@tanstack/react-router";

import { rootRoute } from "app";
import { bidSearchSchema } from "lib/validation";

export const bidRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "new",
  validateSearch: bidSearchSchema,
  component: lazy(() => import("./new")),
});
