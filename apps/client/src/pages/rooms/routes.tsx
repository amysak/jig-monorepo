import { lazy, Navigate, Route } from "@tanstack/react-router";

import { rootRoute } from "app";
import { api } from "lib/api";
import { queryClient } from "lib/query-client";
import { roomParamsSchema, roomsSearchSchema } from "lib/validation";

export const roomsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "rooms",
  validateSearch: roomsSearchSchema,
});

export const roomsIndexRoute = new Route({
  getParentRoute: () => roomsRoute,
  path: "/",
  component: () => <Navigate to="/jobs" />,
});

export const roomRoute = new Route({
  getParentRoute: () => roomsRoute,
  path: "$roomId",
  parseParams: (params) => roomParamsSchema.parse(params),
  onLoad: ({ params }) =>
    queryClient.ensureQueryData({
      queryKey: ["rooms", params.roomId],
      queryFn: () => api.rooms.getById(params.roomId),
    }),
  component: lazy(() => import("./$roomId")),
});
