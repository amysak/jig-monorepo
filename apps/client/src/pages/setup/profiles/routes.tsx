import { lazy, Route } from "@tanstack/react-router";
import { api } from "lib/api";
import { queryClient } from "lib/query-client";
import { profilesSearchSchema, setupParamsSchema } from "lib/validation";

import { setupRoute } from "../setup";

export const profilesRoute = new Route({
  getParentRoute: () => setupRoute,
  path: "profiles",
});

export const profilesIndexRoute = new Route({
  getParentRoute: () => profilesRoute,
  path: "/",
  validateSearch: profilesSearchSchema,
  onLoad: ({ search }) => {
    queryClient.ensureQueryData({
      queryKey: ["profiles", search],
      queryFn: () => api.profiles.getAll(search),
    });
  },
  component: lazy(() => import("./profiles")),
});

export const profileRoute = new Route({
  getParentRoute: () => profilesRoute,
  path: "$id",
  parseParams: (params) => setupParamsSchema.parse(params),
  // component: lazy(() => import("./$id")),
});
