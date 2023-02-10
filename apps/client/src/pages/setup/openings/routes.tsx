import { lazy, Route } from "@tanstack/react-router";

import { api } from "lib/api";
import { queryClient } from "lib/query-client";
import { setupParamsSchema } from "lib/validation";

import { setupRoute } from "../setup";

export const openingsRoute = new Route({
  getParentRoute: () => setupRoute,
  path: "openings",
});

export const openingsIndexRoute = new Route({
  getParentRoute: () => openingsRoute,
  path: "/",
  onLoad: ({ search }) =>
    queryClient.ensureQueryData({
      queryKey: ["openings", search],
      queryFn: () => api.openings.getAll(search),
    }),
  component: lazy(() => import("./openings")),
});

export const openingRoute = new Route({
  getParentRoute: () => openingsRoute,
  path: "$id",
  parseParams: (params) => setupParamsSchema.parse(params),
  onLoad: ({ params }) =>
    queryClient.ensureQueryData({
      queryKey: ["openings", params.id],
      queryFn: () => api.openings.getById(params.id),
    }),
  // component: lazy(() => import("./$id")),
});
