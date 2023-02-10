import { lazy, Route } from "@tanstack/react-router";

import { api } from "lib/api";
import { queryClient } from "lib/query-client";
import { cabinetSearchSchema, setupParamsSchema } from "lib/validation";

import { setupRoute } from "../setup";

export const cabinetsRoute = new Route({
  getParentRoute: () => setupRoute,
  path: "cabinets",
});

export const cabinetsIndexRoute = new Route({
  getParentRoute: () => cabinetsRoute,
  path: "/",
  validateSearch: cabinetSearchSchema,
  onLoad: ({ search }) =>
    queryClient.ensureQueryData({
      queryKey: ["cabinets", search],
      queryFn: () => api.cabinets.getAll(search),
    }),
  component: lazy(() => import("./cabinets")),
});

export const cabinetRoute = new Route({
  getParentRoute: () => cabinetsIndexRoute,
  path: "$id",
  parseParams: (params) => setupParamsSchema.parse(params),
  onLoad: ({ params }) =>
    queryClient.ensureQueryData({
      queryKey: ["cabinets", params.id],
      queryFn: () => api.cabinets.getById(params.id),
    }),
  component: lazy(() => import("./$id")),
});
