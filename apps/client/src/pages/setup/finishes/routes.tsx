import { lazy, Route } from "@tanstack/react-router";

import { api } from "lib/api";
import { queryClient } from "lib/query-client";
import { setupParamsSchema } from "lib/validation";
import { setupRoute } from "../setup";

export const finishesRoute = new Route({
  getParentRoute: () => setupRoute,
  path: "finishes",
});

export const finishesIndexRoute = new Route({
  getParentRoute: () => finishesRoute,
  path: "/",
  onLoad: ({ search }) =>
    queryClient.ensureQueryData({
      queryKey: ["finishes", search],
      queryFn: () => api.finishes.getAll(search),
    }),
  component: lazy(() => import("./finishes")),
});

export const finishRoute = new Route({
  getParentRoute: () => finishesRoute,
  path: "$id",
  parseParams: (params) => setupParamsSchema.parse(params),
  onLoad: ({ params }) =>
    queryClient.ensureQueryData({
      queryKey: ["finishes", params.id],
      queryFn: () => api.finishes.getById(params.id),
    }),
  // component: lazy(() => import("./$id")),
});
