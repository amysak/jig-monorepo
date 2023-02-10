import { lazy, Route } from "@tanstack/react-router";

import { api } from "lib/api";
import { queryClient } from "lib/query-client";
import { setupParamsSchema } from "lib/validation";
import { setupRoute } from "../setup";

export const equipmentRoute = new Route({
  getParentRoute: () => setupRoute,
  path: "equipment",
});

export const equipmentIndexRoute = new Route({
  getParentRoute: () => equipmentRoute,
  path: "/",
  onLoad: ({ search }) =>
    queryClient.ensureQueryData({
      queryKey: ["equipment", search],
      queryFn: () => api.equipment.getAll(search),
    }),
  component: lazy(() => import("./equipment")),
});

// TODO: create separate page
export const equipmentItemRoute = new Route({
  getParentRoute: () => equipmentRoute,
  path: "$id",
  parseParams: (params) => setupParamsSchema.parse(params),
  onLoad: ({ params }) =>
    queryClient.ensureQueryData({
      queryKey: ["equipment", params.id],
      queryFn: () => api.equipment.getById(params.id),
    }),
  // component: lazy(() => import("./equipment")),
});
