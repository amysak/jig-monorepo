import { lazy, Route } from "@tanstack/react-router";

import { api } from "lib/api";
import { queryClient } from "lib/query-client";
import { setupParamsSchema } from "lib/validation";
import { setupRoute } from "../setup";

export const materialsRoute = new Route({
  getParentRoute: () => setupRoute,
  path: "materials",
});

export const materialsIndexRoute = new Route({
  getParentRoute: () => materialsRoute,
  path: "/",
  onLoad: ({ search }) =>
    queryClient.ensureQueryData({
      queryKey: ["materials", search],
      queryFn: () => api.materials.getAll(search),
    }),
  component: lazy(() => import("./materials")),
});

export const materialRoute = new Route({
  getParentRoute: () => materialsRoute,
  path: "$id",
  parseParams: (params) => setupParamsSchema.parse(params),
  onLoad: ({ params }) =>
    queryClient.ensureQueryData({
      queryKey: ["materials", params.id],
      queryFn: () => api.materials.getById(params.id),
    }),
  // component: lazy(() => import("./$id")),
});
