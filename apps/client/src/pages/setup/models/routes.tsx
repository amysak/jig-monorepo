import { lazy, Route } from "@tanstack/react-router";

import { api } from "lib/api";
import { queryClient } from "lib/query-client";
import { setupParamsSchema } from "lib/validation";

import { setupRoute } from "../setup";

export const modelsRoute = new Route({
  getParentRoute: () => setupRoute,
  path: "models",
});

export const modelsIndexRoute = new Route({
  getParentRoute: () => modelsRoute,
  path: "/",
  onLoad: () =>
    queryClient.ensureQueryData({
      queryKey: ["models"],
      queryFn: api.models.getAll,
    }),
  component: lazy(() => import("./models")),
});

export const modelRoute = new Route({
  getParentRoute: () => modelsRoute,
  path: "$id",
  parseParams: (params) => setupParamsSchema.parse(params),
  onLoad: ({ params }) =>
    queryClient.ensureQueryData({
      queryKey: ["models", params.id],
      queryFn: () => api.models.getById(params.id),
    }),
  // component: lazy(() => import("./$id")),
});
